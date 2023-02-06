import { Pagination } from "@mui/material";
import Tippy from "@tippyjs/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageLoader from "../../components/loader";
import Meta from "../../components/Meta";
import { getFeaturedCelebrities } from "../../utils/resquests";

const PER_PAGE = 8;
export default function Celebrities () {
	const [celebriteis, setCelebrities] = useState<CelebrityDetailsType []>([]);
	const [page, setPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);

	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		setLoading(true);

		getFeaturedCelebrities({
			per_page: PER_PAGE,
			current_page: page,
		}).then((data) => {
			setCelebrities(data.data || []);

			setTotalPages(Math.ceil(data.meta?.total / PER_PAGE));
		}).catch((err) => {
			setError('Error loading celebriteis');
		}).finally(() => {
			setLoading(false);
		});
	}, [page])

	return (
		<div className="mt-[95px]">
			<Meta title="Careers || Xhibiter | NFT Marketplace Next.js Template" />
			
			<div className="container">

				<div
				className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4"
				>
					{celebriteis.map((event, index) => {
						const detailUrl = '/celebrity/';

						const { id, image, title, price } = {
							id: event.id,
							image: event.profile_photo || '/images/products/item_1.jpg',
							title: event.title,
							price: undefined,
						}

						return (
						<article key={event.id + '-' + index}>
							<div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-500">
							<figure>
								{/* {`item/${itemLink}`} */}
								<Link href={detailUrl + id} passHref>
									<a>
										<div className="w-full">
										<Image
											src={image}
											alt={title}
											height={230}
											width={230}
											layout="responsive"
											objectFit="cover"
											className="rounded-[0.625rem] w-full"
											unoptimized={true}
											placeholder="empty"
										/>
										</div>
									</a>
								</Link>
							</figure>
							<div className="mt-4 flex items-center justify-between">
								<Link href={detailUrl + id} passHref>
								<a>
									<span className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white">
									{title}
									</span>
								</a>
								</Link>
								{price !== undefined && (
								<span className="dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-1 px-2">
									<Tippy content={<span>$</span>}>
									{/* <img
										src="/images/eth-icon.svg"
										alt=""
										className="w-3 h-3 mr-1"
									/> */}
									<span className="text-green text-sm font-medium tracking-tight">
										$
									</span>
									</Tippy>

									<span className="text-green text-sm font-medium tracking-tight">
									{price}
									</span>
								</span>
								)}
							</div>

                                <div className="mt-8 flex items-center justify-between">
                                    <Link href={detailUrl + id} passHref>
                                    <a>
                                    <button
                                        type="button"
                                        className="text-accent font-display text-sm font-semibold"
                                    >
                                        View Details
                                    </button>
                                    </a>
                                    </Link>

                                    {/* <Likes
                                    like={react_number}
                                    classes="flex items-center space-x-1"
                                    /> */}
                                </div>
							</div>
						</article>
						)
					})}
				</div>

				<div className="white-class mt-16">
					{celebriteis.length > 0 && (
						<Pagination 
							onChange={(e, page) => {
								console.log(e, page)
								setPage(page);
							}}
							count={totalPages}
							variant="outlined" 
							color="primary" 
							shape="rounded" />
					)}
				</div>

			</div>

			{loading && (
				<PageLoader />
			)}
		</div>
    )
}