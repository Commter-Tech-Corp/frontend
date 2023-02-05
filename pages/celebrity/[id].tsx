import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { items_data } from '../../data/items_data';
import Auctions_dropdown from '../../components/dropdown/Auctions_dropdown';
import 'tippy.js/dist/tippy.css';
import { ItemsTabs } from '../../components/component';
// import More_items from './more_items';
import Likes from '../../components/likes';
import Meta from '../../components/Meta';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getCelebrityDetails, getEventDetails } from '../../utils/resquests';
import Image from 'next/image';
import User_items, { User_items_Celeb } from "../../components/user/User_items";

interface DetailsItemType {
	id: string;
	image: string;
	title: string;
	price: number;
	likes: number;
	text: string;
	creatorImage: string;
	ownerImage: string;
	creatorname: string;
	ownerName: string;
	auction_timer: string;
}

const EventItem: InferGetServerSidePropsType<typeof getServerSideProps> = ({
	data
}) => {
	const item: CelebrityDetailsType = data;

	console.log('data', data)

	const { 
		id, 
		image, 
		title, 
		userId, 
		text, 
		joinYear, 
		icon, 
		coverPhoto 
	} = {
		id: item.id,
		image: item.profile_photo,
		title: item.title,
		userId: item.user_id,
		text: item.sub_title,
		joinYear: item.created_at,
		icon: false,
		coverPhoto: null,
	}

	return (
		<>
			<Meta title={`${item.title} || Xhibiter | NFT Marketplace Next.js Template`} />
			{/*  <!-- Item --> */}

			<div className="pt-[5.5rem] lg:pt-24" key={id}>
				{/* <!-- Banner --> */}
				<div className="relative h-[18.75rem]">
					{/* <Image
						src={coverPhoto}
						alt="banner"
						layout="fill"
						objectFit="cover"
					/> */}
				</div>
				{/* <!-- end banner --> */}
				<section className="dark:bg-jacarta-800 bg-light-base relative pb-12 pt-28">
				{/* <!-- Avatar --> */}
				<div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
					<figure className="relative h-40 w-40 dark:border-jacarta-600 rounded-xl border-[5px] border-white">
					<Image
						src={image}
						alt={title}
						layout="fill"
						objectFit="contain"
						className="dark:border-jacarta-600 rounded-xl border-[5px] border-white"
					/>
					<div
						className="dark:border-jacarta-600 bg-green absolute -right-3 bottom-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
						data-tippy-content="Verified Collection"
					>
						{icon && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="24"
							height="24"
							className="h-[.875rem] w-[.875rem] fill-white"
						>
							<path fill="none" d="M0 0h24v24H0z"></path>
							<path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
						</svg>
						)}
					</div>
					</figure>
				</div>

				<div className="container">
					<div className="text-center">
						<h2 className="font-display text-jacarta-700 mb-2 text-4xl font-medium dark:text-white">
							{title}
						</h2>

						<p className="dark:text-jacarta-300 mx-auto mb-2 max-w-xl text-lg">
							{text}
						</p>

					</div>
				</div>
				</section>
				{/* <!-- end profile --> */}
				<User_items_Celeb
					events={item.events || []}
					calls={item.calls || []}
					nfts={item.nft || []}
				/>
			</div>
			{/* <!-- end item --> */}

			{/* <More_items /> */}
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const id = ctx.query.id;

	if (!id) {
		return {
			notFound: true
		}
	}

	try {
		const data = await getCelebrityDetails(+(id.toString()));

		return {
			props: {
				data: data || {}
			}
		}
	} catch (error) {
		return {
			notFound: true
		}
	}
}

export default EventItem;
