"use client";

import React, { FC } from "react";
import { PostDataType } from "@/data/types";
import GallerySlider from "./GallerySlider";
import MediaVideo from "./MediaVideo";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import MediaAudio from "./MediaAudio";
import Link from "next/link";
import Image from "next/image";
import DefaultImage from '../../images/default-image.jpg';

export interface PostFeaturedMediaProps {
  className?: string;
  post: any;
  isHover?: boolean;
  showPhoto?: boolean;
}

const PostFeaturedMedia: FC<PostFeaturedMediaProps> = ({
  className = "w-full h-full",
  post,
  isHover = false,
  showPhoto = false
}) => {
  const { featuredImage, postType, videoUrl, galleryImgs, audioUrl, id, href, cover_photo_url } =
    post;

  const isPostMedia = () => postType === "video" || postType === "audio";

  const renderGallerySlider = () => {
    if (!galleryImgs) return null;
    return (
      <GallerySlider
        href={'/'}
        galleryImgs={galleryImgs}
        className="absolute inset-0 z-10"
        galleryClass="absolute inset-0"
        ratioClass="absolute inset-0"
      />
    );
  };

  const renderContent = () => {
    // GALLERY
    if (postType === "gallery" || showPhoto) {
      return renderGallerySlider();
    }

    // VIDEO
    if (postType === "video" && !!videoUrl && isHover) {
      return <MediaVideo isHover videoUrl={videoUrl} />;
    }

    // AUDIO
    if (postType === "audio" && !!audioUrl) {
      return <MediaAudio post={post} />;
    }

    // ICON
    return isPostMedia() ? (
      <span className="absolute inset-0 flex items-center justify-center ">
        <PostTypeFeaturedIcon
          className="hover:scale-105 transform cursor-pointer transition-transform"
          postType={postType}
        />
      </span>
    ) : null;
  };

  return (
    <div className={`nc-PostFeaturedMedia relative ${className}`}>
      {postType !== "gallery" && (
        <>
          <Image
            alt="featured"
            fill
            className=""
            src={cover_photo_url?.toString().includes("s3.amazonaws.com") ? cover_photo_url : DefaultImage}
            sizes="(max-width: 600px) 480px, 800px"
          />
        </>
      )}
      {renderContent()}
      {postType !== "gallery" && (
        <Link
          href={'/'}
          className={`block absolute inset-0 ${!postType || postType === "standard"
            ? "bg-black/20 transition-opacity opacity-0 group-hover:opacity-100"
            : ""
            }`}
        />
      )}
    </div>
  );
};

export default PostFeaturedMedia;
