"use client";

import AISection from "@/components/Marketing/AI";
import BelieveSection from "@/components/Marketing/Believe";
import ChapterSection from "@/components/Marketing/Chapter";
import ClientSection from "@/components/Marketing/Client";
import Client2Section from "@/components/Marketing/Client2";
import ComplaintSection from "@/components/Marketing/Complaint";
import DeliverableSection from "@/components/Marketing/Deliverables";
import EngagementSection from "@/components/Marketing/Engagement";
import FairySection from "@/components/Marketing/Fairy";
import PartnerSection from "@/components/Marketing/PartnerSection";
import PresentationSection from "@/components/Marketing/Presentation";
import PromiseSection from "@/components/Marketing/Promise";
import ProofSection from "@/components/Marketing/Proof";
import Proof2Section from "@/components/Marketing/Proof2";
import TitleSection from "@/components/Marketing/TitleSection";
// import {ISlideConfig, PageSlides, SlideParallaxType} from '@re_point/react-page-slides';
// import Fullpage, { FullPageSections, FullpageSection } from '@ap.cx/react-fullpage';

export default function Marketing() {

    const slides: any = [
        {
            content: <TitleSection />,
            style: {}
        },
        {
            content: <PartnerSection />,
            style: {}
        }
    ]

    return (
        <div className="nc-PageHomeDemo4 relative">
            {/* <PageSlides
                enableAutoScroll={true}
                transitionSpeed={1000}
                slides={slides}
                parallax={{
                    offset: 0.6,
                    type: SlideParallaxType.reveal
                }}
            /> */}
            <TitleSection />
            <PartnerSection />
            <PresentationSection />
            <ClientSection />
            <Client2Section />
            <hr />
            <BelieveSection />
            <hr />
            <ProofSection />
            <Proof2Section />
            <EngagementSection />
            <hr />
            <ComplaintSection />
            <AISection />
            <FairySection />
            <hr />
            <PromiseSection />
            <hr />
            <DeliverableSection />
            <hr />
            <ChapterSection />
            {/* E5E5E5 */}
        </div>
    )
}