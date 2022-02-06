import { InternalServerError, CustomError } from "../../../utils/customError";
import DbModule from "../../../config/db";

export async function setUpFeeConfigurationJson(req, res, next) {
  try {
    const { FeeConfigurationSpec } = req.body;

    if (!FeeConfigurationSpec) {
      return next(new CustomError(422, "Fee Configuration Spec is required"));
    }

    const FeeConfigurationSpecToArray = FeeConfigurationSpec.split("\n");

    const data = FeeConfigurationSpecToArray.map((fcsSpec) => {
      const fcsKeywords = fcsSpec.replace(": APPLY ", "").split(" ");

      const [feeEnt, entType] = fcsKeywords[3].slice(0, -1).split("(");

      fcsKeywords.splice(3, 1, feeEnt, entType);

      const [
        feeId,
        feeCurrency,
        feeLocale,
        feeEntity,
        entityProperty,
        feeType,
        feeValue,
      ] = fcsKeywords;

      return {
        feeId,
        feeCurrency,
        feeLocale,
        feeEntity,
        entityProperty,
        feeType,
        feeValue,
      };
    });

    // store the item in DB
    const savedConfig = await DbModule.setData(data);
    if (!savedConfig) {
      return next(
        new CustomError(
          400,
          "Fee configurations set up wasn't successful. Try again"
        )
      );
    }

    return res.status(200).json({
      status: "OK",
    });
  } catch (error) {
    next(new InternalServerError(error));
  }
}

const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

export async function computeFeeJson(req, res, next) {
  try {
    const { Amount, Currency, CurrencyCountry, Customer, PaymentEntity } =
      req.body;
    const { BearsFee } = Customer;
    const {
      Issuer,
      Brand,
      Number: PaymentEntityNumber,
      Type,
      Country,
    } = PaymentEntity;

    if (Currency !== "NGN") {
      return res.status(400).json({
        Error: `No fee configuration for ${Currency} transactions.`,
      });
    }

    // get data from file system DbModule
    const feeConfigurations = await DbModule.find();
    if (feeConfigurations.length === 0) {
      return next(new CustomError(404, "No fee Configurations set yet"));
    }

    const feeCurrency = Currency; // can accept *
    const feeLocale = CurrencyCountry === Country ? "LOCL" : "INTL"; // can accept *
    const feeEntity = Type; // can accept *

    const matchedFeeConfigurations = feeConfigurations.filter((feeConfig) => {
      return (
        (feeConfig.feeCurrency == feeCurrency ||
          feeConfig.feeCurrency == "*") &&
        (feeConfig.feeLocale == feeLocale || feeConfig.feeLocale == "*") &&
        (feeConfig.feeEntity == feeEntity || feeConfig.feeEntity == "*") &&
        (feeConfig.entityProperty == Issuer ||
          feeConfig.entityProperty == Brand ||
          feeConfig.entityProperty == PaymentEntityNumber ||
          feeConfig.entityProperty == "*")
      );
    });

    let matched;
    if (matchedFeeConfigurations.length == 0) {
      return res.status(400).json({
        Error: `No fee configuration for the transaction`,
      });
    }
    if (matchedFeeConfigurations.length == 1) {
      matched = matchedFeeConfigurations[0];
    } else {
      matched = matchedFeeConfigurations.reduce((prev, curr) => {
        return countOccurrences(Object.values(prev), "*") >
          countOccurrences(Object.values(curr), "*")
          ? curr
          : prev;
      });
    }

    const flatPercFeeValue =
      matched.feeType == "FLAT_PERC" && matched.feeValue.split(":");

    const appliedFeeValue =
      matched.feeType === "FLAT"
        ? Number.parseFloat(matched.feeValue)
        : matched.feeType === "PERC"
        ? (Number.parseFloat(matched.feeValue) * Amount) / 100
        : Number(
            Number(flatPercFeeValue[0]) +
              (Number.parseFloat(flatPercFeeValue[1]) * Amount) / 100
          );

    const chargeAmount = BearsFee ? Amount + appliedFeeValue : Amount;

    const settlementAmount = chargeAmount - appliedFeeValue;

    return res.status(200).json({
      AppliedFeeID: matched.feeId,
      AppliedFeeValue: appliedFeeValue,
      ChargeAmount: chargeAmount,
      SettlementAmount: settlementAmount,
    });
  } catch (error) {
    next(new InternalServerError(error));
  }
}
