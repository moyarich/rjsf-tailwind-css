import { Storage } from "aws-amplify";

import type { StoragePutConfig, StorageGetConfig } from "@aws-amplify/storage";

const handleS3FileUpload = async (file: File, config: StoragePutConfig = {}) => {
    const uploadConfig = {
        contentType: file.type,
        level: "protected",
        ...config,
    };

    const result = await Storage.put(file.name, file, uploadConfig);
    return { key: result.key };
};

interface IGetPreSignedS3URL {
    (key: string, config?: StorageGetConfig): Promise<string>;
}

const getPreSignedS3URL: IGetPreSignedS3URL = async (key, config) => {
    return await Storage.get(key, {
        level: "protected",
        ...(config ?? {}),
        download: false,
    });
};
