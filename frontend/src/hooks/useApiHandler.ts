import useAxios from "./useAxios";

export default function useApiHandler() {
    const customAxios = useAxios();

    const uploadImage = async (formData: FormData, abortSignal: AbortSignal) => {
        return customAxios.post('/request-bg-removal', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                
            },
            signal: abortSignal,
        });
    };

    return { uploadImage };

}