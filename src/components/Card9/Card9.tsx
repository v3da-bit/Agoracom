import React, { FC, useState } from "react";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "@/data/types";
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment";
// import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import PostFeaturedMedia from "@/components/PostFeaturedMedia/PostFeaturedMedia";
import Link from "next/link";
import Image from "next/image";
import GallerySlider from "../PostFeaturedMedia/GallerySlider";
import MediaVideo from "../PostFeaturedMedia/MediaVideo";
import MediaAudio from "../PostFeaturedMedia/MediaAudio";
import Reels from "../Card12/Reels";
import Button from "../Button/Button";
import DefaultImage from "../../images/default-image.jpg";
import TrailerImage from "../../images/trailer.jpg";
import NcModal from "../NcModal/NcModal";
import moment from "moment";

export interface Card9Props {
  className?: string;
  ratio?: string;
  post: any;
  hoverClass?: string;
  setModal?: any;
  screen?: string;
  previewReels?: any;
}

const Card9: FC<Card9Props> = ({
  className = "h-full",
  ratio = "aspect-w-3 aspect-h-3 sm:aspect-h-4",
  post,
  hoverClass = "",
  setModal,
  screen = "",
  previewReels
}) => {
  const { title, href, trailer, featuredImage, small_logo_url, categories, author, created_at, postType = 'gallery', date, galleryImgs, videoUrl, audioUrl, cover_photo_url, video_link } = post;
  let videoLink: any

  if (screen == 'Company') { videoLink = trailer?.video_link?.replace('watch?v=', 'embed/') } else { videoLink = video_link ? video_link?.replace("watch?v=", "embed/") : videoUrl?.replace("watch?v=", "embed/") }
  if (videoLink?.toString().includes('&pp=')) {
    const index = videoLink.indexOf('&pp=')
    videoLink = videoLink.slice(0, index)
  }


  const renderVideoModalContent = () => {
    let url: any = isPlay
    if (isPlay?.includes('&')) {
      url = isPlay.split('&')[0];
    }
    return (
      <div className="aspect-w-16 aspect-h-9 ">
        <iframe
          src={url}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="ncblog hero video"
        ></iframe>
      </div>
    );
  };
  const [isHover, setIsHover] = useState(false);
  const [isPlay, setIsPlay] = useState('');
  const [imgUrl, setImgUrl] = useState(featuredImage);

  let img = ''
  if (screen == 'Reels' && videoLink?.toString().includes('youtu.be/')) {

    let code: any = videoLink?.indexOf('youtu.be/')


    img = 'https://img.youtube.com/vi/' + videoLink.slice(code + 9,) + '/hqdefault.jpg'



  } else if (screen == 'Reels' && videoLink?.toString().includes('shorts/')) {
    let code: any = videoLink?.indexOf('shorts/')


    img = 'https://img.youtube.com/vi/' + videoLink.slice(code + 7,) + '/hqdefault.jpg'

  } else if(screen == 'Reels' && videoLink?.toString().includes('&list=')){
    let code: any = videoLink?.indexOf('embed/')
    let code2:any=videoLink?.indexOf('&list=')



    img = 'https://img.youtube.com/vi/' + videoLink.slice(code+6,code2) + '/hqdefault.jpg'
    console.log(img);
  }else if (screen == 'Reels' && videoLink?.toString().includes('embed/')) {
    let code: any = videoLink?.indexOf('embed/')


    img = 'https://img.youtube.com/vi/' + videoLink.slice(code + 6,) + '/hqdefault.jpg'
    console.log(img);

  }
  if (img.includes(' ')) {
    img = img?.replace(' ', '')
  }
  const renderMeta = () => {
    return (
      <>
        {
          (screen === 'Trailer' || screen === 'Company') ? <></> : (
            <div className="inline-flex items-center text-xs text-neutral-300">
              <div className="block ">
                <h2 className="block text-base sm:text-lg font-semibold text-white ">
                  <span className="line-clamp-2" title={title}>
                    {title}
                  </span>
                </h2>
                <div className="flex mt-2.5 relative">
                  <span className="block text-neutral-200 hover:text-white font-medium truncate">
                    {author?.displayName || ""}
                  </span>
                  <span className="mx-[6px] font-medium">·</span>
                  <span className="font-normal truncate">{date ? date : moment(created_at).format('ll')}</span>
                </div>
              </div>
            </div>
          )
        }
      </>
    );
  };

  const isPostMedia = () => postType === "video" || postType === "audio";

  const renderGallerySlider = () => {
    if (!galleryImgs) return null;
    return (
      <GallerySlider
        href={href || '/'}
        galleryImgs={galleryImgs}
        className="absolute inset-0 z-10"
        galleryClass="absolute inset-0"
        ratioClass="absolute inset-0"
      />
    );
  };

  const getUrl = (url: any) => {
    if (url?.toString().includes("s3.amazonaws.com") || url?.toString().includes(".com")) {
      return url;
    } else {
      return TrailerImage;
    }
  }

  const renderContent = () => {
    // GALLERY
    if (postType === "gallery") {
      return renderGallerySlider();
    }

    // VIDEO
    if (postType === "video" && !!videoLink && isHover) {
      return <MediaVideo isHover videoUrl={videoLink} post={post} setCurrentReel={previewReels} />;
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
    <>
      {isPlay === '' ? <></> : <NcModal
        isOpenProp={isPlay ? true : false}
        onCloseModal={() => setIsPlay('')}
        contentExtraClass="max-w-screen-lg 2xl:max-w-screen-xl"
        contentPaddingClass=""
        renderContent={renderVideoModalContent}
        renderTrigger={() => <></>}
        modalTitle=""
      />}
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={`nc-Card9 relative flex flex-col group rounded-3xl overflow-hidden z-0 ${hoverClass} ${className}`}
      >
        {/* <PostCardLikeAndComment className="relative" />
        <PostCardSaveAction hidenReadingTime className="relative" /> */}
        {
          (screen === 'Trailer' || screen === 'Company') && isHover ? (
            <>
              <div className="w-full h-full bg-black absolute z-10 opacity-50"></div>
              <div className="absolute z-20 w-full h-full flex justify-center">
                <div className="h-full flex flex-col justify-center">

                  {screen == 'Company' ? post.trailer ? <Button
                    className="!text-sm"
                    sizeClass="py-2.5 px-4 sm:px-4"
                    pattern="primary"
                    onClick={() => setIsPlay(videoLink.toString())}
                  >
                    View Trailer
                  </Button> : <></> : <Button
                    className="!text-sm"
                    sizeClass="py-2.5 px-4 sm:px-4"
                    pattern="primary"
                    onClick={() => setIsPlay(videoLink.toString())}
                  >
                    View Trailer
                  </Button>}
                  <Button
                    className="!text-sm"
                    sizeClass="mt-3 py-2.5 px-4 sm:px-4"
                    pattern="primary"
                  >
                    <Link href={`/company/${screen == 'Company' ? post.id : post?.company_id}`}>
                      See Hub
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          ) : <></>
        }
        <div className={`flex items-start relative w-full ${ratio}`}></div>
        {postType === "audio" ? (
          <div className="absolute inset-0">
            <PostFeaturedMedia post={post} />
          </div>
        ) : (
          <div>
            <Image
              fill
              alt={''}
              onError={(e: any) => getUrl(imgUrl)}
              // onError={(e:any) => setImgUrl(featuredImage)}
              className="object-cover w-full h-full rounded-3xl"
              src={screen === 'Company' ? trailer ? getUrl(cover_photo_url) : getUrl(small_logo_url) : screen === 'Reels' && cover_photo_url == null ? getUrl(img) : cover_photo_url ? getUrl(cover_photo_url) : getUrl(imgUrl)}
              sizes="(max-width: 600px) 480px, 500px"
            />
            {renderContent()}
            {/* <PostTypeFeaturedIcon
              className="absolute top-3 left-3 group-hover:hidden"
              postType={postType}
              wrapSize="w-7 h-7"
              iconSize="w-4 h-4"
            /> */}
            <span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </div>
        )}
        <div
          className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black opacity-50"
        ></div>
        <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col flex-grow">
          {/* <Link href={'/'} className="absolute inset-0"></Link> */}
          <div className="mb-3">
            {/* <CategoryBadgeList categories={categories} /> */}
          </div>
          {isHover ? <></> : renderMeta()}
        </div>
      </div>
      {
        screen === 'Reels' ? (
          <div className="text-center text-base p-2 cursor-pointer">
            <Link href={`/company/${post?.company_id}`}>
              <Button
                className="!text-sm"
                sizeClass="py-2.5 px-4 sm:px-4"
                pattern="primary"
              >
                View Company
              </Button>
            </Link>
          </div>
        ) : <></>
      }
    </>
  );
};

export default Card9;
