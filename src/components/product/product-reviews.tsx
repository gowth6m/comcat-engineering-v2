import ApiClient from "@/services/api-client";
import { ApiError } from "@/types/api.type";
import { reviewSchema } from "@/types/validation";
import { formatDateTimeFromToday } from "@/utils/format";
import { List, ListItem, Rating, TextField, Typography } from "@mui/material";
import { Product } from "@prisma/client";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Column from "../core/column";
import CoreButton from "../core/core-button";
import CoreIcon from "../core/core-icon";
import Row from "../core/row";
import LoadingTopbar from "../progress-bar/loading-topbar";
import ProductReviewsSkeleton from "./skeletons/product-reviews-skeleton";

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

    if (reviewsQuery.isLoading) {
        return <ProductReviewsSkeleton />;
    }

    if (reviewsQuery.isError || !reviewsQuery.data?.data.data) {
        return (
            <Column
                id={"product-reviews"}
                sx={{
                    flex: 2,
                }}
            >
                <Typography variant="h6">Reviews</Typography>
                <Typography variant="body1">Error loading reviews</Typography>
            </Column>
        );
    }

    return (
        <>
            {addReview.isLoading && <LoadingTopbar />}

            <Column
                id={"product-reviews"}
                sx={{
                    flex: 2,
                }}
            >
                {/********************************
                 * ADD REVIEW FORM
                 *******************************/}
                <Column
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                    }}
                    gap={1}
                >
                    <Typography variant="h6">Add a review</Typography>

                    <Row alignItems={"center"}>
                        <Typography variant="body1">
                            What do you think about this product?
                        </Typography>
                        <Rating
                            name="simple-controlled"
                            value={formik.values.rating}
                            onChange={(_event, newValue) => {
                                formik.setFieldValue("rating", newValue);
                            }}
                        />
                    </Row>

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
                        placeholder="Write your review here"
                    />

                    <CoreButton
                        buttonVariant="primary"
                        onClick={() => {
                            console.log("submitting");
                            formik.handleSubmit();
                        }}
                        sx={{ my: 1 }}
                    >
                        Submit
                    </CoreButton>
                </Column>

                {/********************************
                 * LIST OF REVIEWS
                 *******************************/}
                <Column gap={1}>
                    <Typography variant="h6">
                        Reviews on this product (
                        {reviewsQuery.data?.data.data.length})
                    </Typography>

                    {reviewsQuery.data?.data.data.length === 0 ? (
                        <Typography variant="body1">
                            No reviews yet. Be the first to leave a review!
                        </Typography>
                    ) : (
                        <List>
                            {reviewsQuery.data?.data.data.map((review) => (
                                <ListItem key={review.id} dense>
                                    <Row>
                                        <CoreIcon.UserCircle size={32} />
                                        <Column gap={0.5}>
                                            <Row
                                                alignItems={"center"}
                                                justifyContent={"space-between"}
                                                gap={1}
                                            >
                                                <Typography variant="subtitle2">
                                                    {review.userEmail}
                                                </Typography>
                                                <Typography variant="caption">
                                                    {formatDateTimeFromToday(
                                                        review.createdAt.toString()
                                                    )}
                                                </Typography>
                                            </Row>
                                            <Rating
                                                value={review.rating}
                                                size={"small"}
                                                readOnly
                                            />
                                            <Typography variant="body1">
                                                {review.comment}
                                            </Typography>
                                        </Column>
                                    </Row>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Column>
            </Column>
        </>
    );
};

export default ProductReviews;
