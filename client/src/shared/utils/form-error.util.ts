// shared/utils/form-error.util.ts

export const applyServerErrors = (
    setError: any,
    errors?: Record<string, string>
) => {
    if (!errors) return;

    Object.entries(errors).forEach(([field, message]) => {
        setError(field as any, {
            type: "server",
            message,
        });
    });
};