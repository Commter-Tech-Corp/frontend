import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { items_data } from '../../data/items_data';
import Auctions_dropdown from '../../components/dropdown/Auctions_dropdown';
import Link from 'next/link';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Items_Countdown_timer from '../../components/items_countdown_timer';
import { ItemsTabs } from '../../components/component';
// import More_items from './more_items';
import Likes from '../../components/likes';
import Meta from '../../components/Meta';
import { useDispatch } from 'react-redux';
import { bidsModalShow } from '../../redux/counterSlice';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getEventDetails, getVideoDetails } from '../../utils/resquests';
import { placeholderImage } from '../../utils/constants';

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

const VideoItem: InferGetServerSidePropsType<typeof getServerSideProps> = ({
	data
}) => {
	const item: VidoeItemType = data;

	const dispatch = useDispatch();
	const router = useRouter();
	const pid = router.query.item;

	const [imageModal, setImageModal] = useState(false);

	if (!item) return null;

	const {
		image,
		title,
		id,
		likes,
		text,
		creatorImage,
		ownerImage,
		creatorname,
		ownerName,
		price,
		auction_timer,
	} = {
		image: item.photo || placeholderImage,
		title: item.name,
		id: item.id,
		likes: 0,
		auction_timer: 0,
		creatorImage: '',
		creatorname: '',
		ownerImage: '',
		ownerName: '',
		price: item.price,
		text: item.detail,
	}

	return (
		<>
			<Meta title={`${title} || Xhibiter | NFT Marketplace Next.js Template`} />
			{/*  <!-- Item --> */}
			<section className="relative lg:mt-24 lg:pt-24 lg:pb-24 mt-24 pt-12 pb-24">
				<picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
					<img src="/images/gradient_light.jpg" alt="gradient" className="h-full" />
				</picture>
				<div className="container">
					
					{/* <!-- Item --> */}
					<div className="md:flex md:flex-wrap" key={id}>
						{/* <!-- Image --> */}
						<figure className="mb-8 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2 w-full">
							<button className=" w-full" onClick={() => setImageModal(true)}>
								<img src={image} alt={title} className="rounded-2xl cursor-pointer  w-full" />
							</button>

							{/* <!-- Modal --> */}
							<div className={imageModal ? 'modal fade show block' : 'modal fade'}>
								<div className="modal-dialog !my-0 flex h-full max-w-4xl items-center justify-center">
									<img src={image} alt={title} className="h-full rounded-2xl" />
								</div>

								<button
									type="button"
									className="btn-close absolute top-6 right-6"
									onClick={() => setImageModal(false)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										width="24"
										height="24"
										className="h-6 w-6 fill-white"
									>
										<path fill="none" d="M0 0h24v24H0z" />
										<path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
									</svg>
								</button>
							</div>
							{/* <!-- end modal --> */}
						</figure>

						{/* <!-- Details --> */}
						<div className="md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem]">
							{/* <!-- Collection / Likes / Actions --> */}
							<div className="mb-3 flex">
								{/* <!-- Collection --> */}
								{/* <div className="flex items-center">
									<Link href="#">
										<a className="text-accent mr-2 text-sm font-bold">CryptoGuysNFT</a>
									</Link>
									<span
										className="dark:border-jacarta-600 bg-green inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
										data-tippy-content="Verified Collection"
									>
										<Tippy content={<span>Verified Collection</span>}>
											<svg className="icon h-[.875rem] w-[.875rem] fill-white">
												<use xlinkHref="/icons.svg#icon-right-sign"></use>
											</svg>
										</Tippy>
									</span>
								</div> */}

								{/* <!-- Likes / Actions --> */}
								{/* <div className="ml-auto flex items-stretch space-x-2 relative">
									<Likes
										like={likes}
										classes="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 flex items-center space-x-1 rounded-xl border bg-white py-2 px-4"
									/>

									{/* <!-- Actions --> 
									<Auctions_dropdown classes="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white" />
								</div> */}
							</div>

							<h1 className="font-display text-jacarta-700 mb-4 text-4xl font-semibold dark:text-white">
								{title}
							</h1>

							<div className="mb-8 flex items-center space-x-4 whitespace-nowrap">
								<div className="flex items-center">
									{/* <Tippy content={<span>$</span>}>
										<span className="-ml-1">
											<svg className="icon mr-1 h-4 w-4">
												<use xlinkHref="/icons.svg#icon-ETH"></use>
											</svg>
										</span>
									</Tippy> */}
									<span className="text-green text-sm font-medium tracking-tight">
										$ {price}
									</span>
								</div>
								{/* <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
									Highest bid
								</span>
								<span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
									1/1 available
								</span> */}
							</div>

							{/* <p className="dark:text-jacarta-300 mb-10">{text}</p> */}

							<div dangerouslySetInnerHTML={{ __html: text }} />

							
							{/* <!-- end bid --> */}
						</div>
						{/* <!-- end details --> */}
					</div>
					
					{/* <ItemsTabs /> */}
				</div>
			</section>
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
		const data = await getVideoDetails(+(id.toString()));

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

export default VideoItem;
