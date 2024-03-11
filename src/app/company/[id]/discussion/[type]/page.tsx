'use client';

import Heading from '@/components/Heading/Heading'
import Nav from '@/components/Nav/Nav'
import NavItem from '@/components/NavItem/NavItem'
import React, { Fragment, useEffect, useState } from 'react'
import View from '../../View';
import { DEMO_POSTS } from '@/data/posts'
import HomeFeatured from '../../HomeFeatured';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Image from 'next/image';
import DefaulImage from '@/images/default-image.jpg'
import Input from '@/components/Input/Input';
import ButtonCircle from '@/components/Button/ButtonCircle';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid';
import FooterHomeBsm from '../../FooterHomeBsm';
import Discussion from '../../Discussion';
import PressRelease from '../../PressRelease';
import Qna from '../../Qna';
import ButtonSecondary from '@/components/Button/ButtonSecondary';
import Research from '../../Research';
import { useParams, useRouter } from 'next/navigation';
import { getCompanies, getCompanyMessages, getMoreCompanies } from '@/requests/Home';
import { getBulletins, getDiscussion, getMembers } from '@/requests/Companies';
import Link from 'next/link';
import Photos from '../../Photos';
import Videos from '../../Videos';
import NewsCompany from '../../News';
import Post from './Post';
import { useSelector } from 'react-redux';
import CompanyScreen from '../../page';



export let discuss = []
function CompanyDiscussionScreen({ }: any) {
    return (
        <Fragment>
            <CompanyScreen />
        </Fragment>
    )
}

export default CompanyDiscussionScreen

