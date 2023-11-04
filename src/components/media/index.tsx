import React, { useState, useEffect } from "react";
import Image from "next/image";
import type { StorageGetConfig } from "@aws-amplify/storage";
import { Storage } from "aws-amplify";
import ReactPlayer from "react-player";

import { cn } from "@/lib/utils";

export interface IMediaData {
    fileLocation: string;
    s3ObjectKey?: string;
    url?: string;
    dataURL?: string;
    alt?: string;
}
export interface IMediaDisplay {
    className?: string;
    mediaData: IMediaData;
}

export const ImageDisplay: React.FC<IMediaDisplay> = ({ className, mediaData, ...props }) => {
    const [imageURL, setImageURL] = useState<string | null>(null);
    const { alt = "Img" } = mediaData;

    useEffect(() => {
        // Use the getMediaURL utility function to get the image URL
        getMediaURL(mediaData)
            .then((url) => setImageURL(url))
            .catch((error) => console.error(error));
    }, [mediaData]);

    return (
        <>
            {imageURL && (
                <Image
                    src={imageURL}
                    alt={alt}
                    layout="fill"
                    className={cn("img-display ", className)}
                    {...props}
                />
            )}
        </>
    );
};

export function getMediaURL(mediaData: IMediaData): Promise<string | null> {
    const { fileLocation = "", s3ObjectKey = "", url = "" } = mediaData ?? {};

    switch (fileLocation) {
        case "s3":
            return getPreSignedS3URL(s3ObjectKey)
                .then((url) => url)
                .catch((error) => {
                    console.error(error);
                    return null;
                });
        case "url":
        case "dataURL":
            return Promise.resolve(url);
        default:
            return Promise.resolve(null);
    }
}

export const getPreSignedS3URL = async (
    key: string,
    config?: StorageGetConfig<Record<string, unknown>>,
) => {
    return await Storage.get(key, {
        ...{ level: "protected", ...(config ?? {}) },
        download: false,
    });
};

export const getS3ObjectMimeType = async (
    key: string,
    config?: StorageGetConfig<Record<string, unknown>>,
) => {
    try {
        // Retrieve the object's metadata to get the MIME type
        const response = await Storage.get(key, {
            ...{ level: "protected", ...(config ?? {}) },
            download: true,
        });

        // Access the MIME type from the response's Content-Type header
        const headers = response.$metadata;
        const mimeType = headers["content-type" as keyof typeof headers];

        return mimeType;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export interface IVideoDisplayProps<
    T extends { videoMedia: IMediaData; thumbnailMedia?: IMediaData },
> {
    className?: string;
    media?: T;
}

export const VideoDisplay = <T extends { videoMedia: IMediaData; thumbnailMedia?: IMediaData }>({
    className,
    media,
    ...videoSettings
}: IVideoDisplayProps<T>) => {
    const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);
    const [videoURL, setVideoURL] = useState<string | null>(null);

    useEffect(() => {
        if (media) {
            const { thumbnailMedia, videoMedia } = media;

            const fetchThumbnail = thumbnailMedia
                ? getMediaURL(thumbnailMedia)
                : Promise.resolve("");
            const fetchVideo = getMediaURL(videoMedia);

            Promise.all([fetchThumbnail, fetchVideo])
                .then(([thumbnailUrl, videoUrl]) => {
                    setThumbnailURL(thumbnailUrl);
                    setVideoURL(videoUrl);
                })
                .catch((error) => console.error(error));
        }
    }, [media]);

    return (
        <div>
            {videoURL && (
                <div className={cn("player-wrapper", className)}>
                    <ReactPlayer
                        url={videoURL}
                        controls={true}
                        width={"100%"}
                        height={"100%"}
                        light={thumbnailURL || ""}
                        {...videoSettings}
                    />
                </div>
            )}
        </div>
    );
};
