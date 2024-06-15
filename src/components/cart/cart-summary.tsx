import React, { useState } from "react";
import { useCartStore } from "@/stores/cart-store";
import { Chip, Divider, TextField, Typography } from "@mui/material";
import Column from "../core/column";
import CoreButton from "../core/core-button";
import Row from "../core/row";
import { formatAmount } from "@/utils/format";
import {
    calculateSaving,
    calculateSavingsFromPromo,
    calculateVATPayment,
    priceBeforeDiscountOrVAT,
    totalAmount,
} from "@/utils/cart";
import { ApiError } from "@/types/api.type";
import { useMutation } from "react-query";
import ApiClient from "@/services/api-client";
import toast from "react-hot-toast";
import useErrorHandler from "@/hooks/useErrorHandler";
import LoadingTopbar from "../progress-bar/loading-topbar";
import { useRouter } from "next/navigation";
import { Setting } from "@prisma/client";

// -----------------------------------------------------------

interface Props {
    settings: Setting | null;
}

const CartSummary: React.FC<Props> = ({ settings }) => {
    const router = useRouter();
    const { cart, setPromoCode } = useCartStore();
    const [promoText, setPromoText] = useState<string>("");
    const [errorMap, setErrorMap] = useState<ApiError[]>([]);
    const { hasError, getErrorMessage } = useErrorHandler({
        errorMap: errorMap,
    });

    const handleApplyPromoCode = useMutation({
        mutationFn: () => {
            return ApiClient.promoCode.getPromoCode(promoText);
        },
        onSuccess: (data) => {
            setPromoCode(data.data.data);
            setErrorMap([]);
            setPromoText("");
            toast.success("Promo code applied");
        },
        onError: (error: any) => {
            setErrorMap(error.response.data.errors);
        },
    });

    return (
        <Column
            marginY={4}
            flex={2}
            sx={{
                backgroundColor: "secondary.light",
                color: "secondary.contrastText",
                borderRadius: 1,
                padding: 2,
                maxWidth: 360,
            }}
        >
            {handleApplyPromoCode.isLoading && <LoadingTopbar />}

            <Typography variant="h4">Cart summary</Typography>

            <Divider flexItem />

            <Column gap={0.5}>
                <Row justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant="body1">Items total:</Typography>
                    <Typography variant="body1">
                        {priceBeforeDiscountOrVAT(cart)}
                    </Typography>
                </Row>

                <Row justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant="body1">Savings:</Typography>
                    <Typography variant="body1">
                        {`${calculateSaving(cart)}`}
                    </Typography>
                </Row>

                <Row justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant="body1">Delivery:</Typography>
                    <Typography variant="body1">
                        {`${formatAmount(settings?.deliveryCost ?? 0)}`}
                    </Typography>
                </Row>

                <Row justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant="body1">Estimated VAT:</Typography>
                    <Typography variant="body1">
                        {`${calculateVATPayment(
                            cart,
                            settings?.taxRate ?? 20
                        )}`}
                    </Typography>
                </Row>

                {/****************************************
                 * PROMO
                 ****************************************/}

                {cart.promoCode && (
                    <Row justifyContent={"space-between"} alignItems={"center"}>
                        <Typography variant="body1">
                            Promotion Applied:
                        </Typography>
                        <Typography variant="body1">
                            {`-${calculateSavingsFromPromo(cart)}`}
                        </Typography>
                    </Row>
                )}

                <Row
                    component={"form"}
                    justifyContent={"space-between"}
                    marginY={1}
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleApplyPromoCode.mutate();
                    }}
                >
                    <TextField
                        size="small"
                        placeholder="Promo code"
                        variant="outlined"
                        value={promoText}
                        onChange={(e) => setPromoText(e.target.value)}
                        error={hasError({ field: "code" })}
                        helperText={
                            hasError({ field: "code" }) &&
                            getErrorMessage({ field: "code" })
                        }
                        sx={styles.textField}
                    />
                    <CoreButton
                        buttonVariant="primary"
                        type={"submit"}
                        disabled={handleApplyPromoCode.isLoading}
                        sx={{
                            my: 0.3,
                        }}
                    >
                        Apply
                    </CoreButton>
                </Row>

                <Row marginBottom={1}>
                    {cart.promoCode && (
                        <Chip
                            size="small"
                            label={`${cart.promoCode.code.toUpperCase()}`}
                            color={"success"}
                            onDelete={() => setPromoCode(null)}
                        />
                    )}
                </Row>
                <Column gap={0}>
                    <Row justifyContent={"space-between"} alignItems={"center"}>
                        <Typography variant="h5">Order total:</Typography>
                        <Typography variant="h5">
                            {totalAmount(cart, settings?.deliveryCost ?? 0)}
                        </Typography>
                    </Row>
                    <Row justifyContent={"flex-end"} alignItems={"center"}>
                        <Typography variant="caption">
                            (incl. VAT and delivery)
                        </Typography>
                    </Row>
                </Column>
            </Column>

            <CoreButton buttonVariant="primary">Proceed to checkout</CoreButton>

            <CoreButton
                buttonVariant="secondary"
                onClick={() => {
                    router.push("/");
                }}
            >
                Continue shopping
            </CoreButton>
        </Column>
    );
};

const styles = {
    textField: {
        minWidth: 240,
        input: {
            color: "common.white",
            "&:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 30px #1e1e1e inset",
                WebkitTextFillColor: "common.white",
            },
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.42)",
            },
            "&:hover fieldset": {
                borderColor: "rgba(255, 255, 255, 0.87)",
            },
            "&.Mui-focused fieldset": {
                borderColor: "common.white",
            },
        },
        "& .MuiInputLabel-root": {
            color: "common.white",
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "common.white",
        },
        "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 30px #1e1e1e inset",
            WebkitTextFillColor: "white",
        },
    },
};

export default CartSummary;
