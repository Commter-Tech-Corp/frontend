import Tippy from "@tippyjs/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageLoader from "../../components/loader";
import Meta from "../../components/Meta";
import { ProductRowSkeleton } from "../../components/skeleton";
import { getOrders } from "../../utils/resquests";

export default function OrdersPage () {
	const [orders, setOrders] = useState<OrderItem []>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		getOrders().then((orers) => {
			setOrders(orers);
		}).catch((err) => {
			setError('Error loading orders');
		}).finally(() => {
			setLoading(false);
		});
	}, []);

	const skeletonRows: JSX.Element [] = [];

	if (loading && orders.length === 0) {
		for (let i = 0; i < 4; i++) {
			skeletonRows.push(<div className="w-full mb-4">
				<ProductRowSkeleton key={i} />
			</div>);
		}
	}

	return (
		<div className="mt-[95px]">
			<Meta title="Careers || Xhibiter | NFT Marketplace Next.js Template" />
			
			<div className="container">

				<div
				className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4"
				>
					{orders.map((order, index) => {
						const detailUrl = '/orders/';

						const { id, image, title, price } = {
							id: order.id,
							image: '/images/products/item_1.jpg',
							title: order.name,
							price: order.price,
						}

						return (
						<article key={order.id + '-' + index}>
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

				{skeletonRows}

			</div>

			{loading && (
				<PageLoader />
			)}
		</div>
    )
}