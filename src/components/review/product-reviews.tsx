import ApiClient from "@/services/api-client";
import { ApiError } from "@/types/api.type";
import { reviewSchema } from "@/types/validation";
import { List, ListItem, Rating, Stack, TextField } from "@mui/material";
import { Product } from "@prisma/client";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toFormikValidationSchema } from "zod-formik-adapter";
import CoreButton from "../core/core-button";
import LoadingTopbar from "../progress-bar/loading-topbar";

// -----------------------------------------------------------

interface Props {
    product: Product;
}

const ProductReviews: React.FC<Props> = ({ product }) => {
    const queryClient = useQueryClient();
    const [errorMap, setErrorMap] = useState<ApiError[]>([]);

    const formik = useFormik({
        initialValues: {
            rating: 0,
            comment: "",
            productId: product.id,
        },
        onSubmit: async (values) => {
            await addReview.mutateAsync({
                rating: values.rating,
                comment: values.comment,
                productId: values.productId,
            });
        },
        validationSchema: toFormikValidationSchema(reviewSchema),
    });

    const reviewsQuery = useQuery({
        queryKey: ["getReviewsByProductSlug", product.slug],
        queryFn: async () => {
            return await ApiClient.review.getReviewsByProductSlug(product.slug);
        },
    });

    const addReview = useMutation({
        mutationFn: async (input: {
            rating: number;
            comment: string;
            productId: string;
        }) => {
            return ApiClient.review.createReview(input);
        },
        onError: (error: any) => {
            toast.error("Failed to register user");
            setErrorMap(error.response.data.errors);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("getReviewsByProductSlug");
            queryClient.invalidateQueries("getProductBySlug");
            toast.success("Review added successfully");
            formik.resetForm();
        },
    });

    return (
        <>
            {addReview.isLoading && <LoadingTopbar />}

            <form
                onSubmit={(e) => {
                    console.log("submitting");
                    e.preventDefault();
                    formik.handleSubmit();
                }}
                style={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    padding: "16px",
                    width: "100%",
                }}
            >
                <Rating
                    name="simple-controlled"
                    value={formik.values.rating}
                    onChange={(_event, newValue) => {
                        formik.setFieldValue("rating", newValue);
                    }}
                />

                <TextField
                    id="comment"
                    name="comment"
                    label="Comment"
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    multiline
                    rows={2}
                    error={
                        (formik.touched.comment &&
                            Boolean(formik.errors.comment)) ||
                        errorMap.some((error) => error.field === "comment")
                    }
                    helperText={
                        (formik.touched.comment && formik.errors.comment) ||
                        errorMap.find((error) => error.field === "comment")
                            ?.message
                    }
                />

                <CoreButton
                    buttonVariant="primary"
                    onClick={() => {
                        console.log("submitting");
                        formik.handleSubmit();
                    }}
                >
                    Submit
                </CoreButton>
            </form>

            <List>
                {reviewsQuery.data?.data.data.map((review) => (
                    <ListItem key={review.id}>
                        <Rating value={review.rating} readOnly />
                        <p>{review.comment}</p>
                        <p>{review.email}</p>
                        <p>{review?.createdAt?.toString()}</p>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default ProductReviews;
