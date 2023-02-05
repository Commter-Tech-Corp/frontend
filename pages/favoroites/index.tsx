import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import PageLoader from "../../components/loader";
import Meta from "../../components/Meta";
import { getFavoriteList } from "../../utils/resquests";

export default function FavoroitesPage () {
    const [favoroitesItems, setFavoroitesItems] = useState<FavoroiteItem []>([]);
    const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>('')

    useEffect(() => {
        getFavoriteList().then(res => {
            setFavoroitesItems(res);
        }).finally(() => {
            setLoading(false);
        }).catch(err => {
            setError('Error loading favoroites');
        });
    }, [])

    return (
        <div className="mt-[95px]">
			<Meta title="Favoroites || Xhibiter | NFT Marketplace Next.js Template" />
			
			<div className="container">

				<div
				className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4"
				>
					{favoroitesItems.map((item, index) => {
						const detailUrl = '/favoroite/';

						const { id, image, title } = {
							id: item.id,
							image: item.profile_photo || '/images/products/item_1.jpg',
							title: item.title,
						}

						return (
						<article key={item.id + '-' + index}>
							<div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-500">
							<figure>
								{/* {`item/${itemLink}`} */}
								{/* <Link href={detailUrl + id} passHref>
									<a> */}
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
									{/* </a>
								</Link> */}
							</figure>
							<div className="mt-4">
								{/* <Link href={detailUrl + id} passHref>
                                    <a> */}
                                        <h3 className="font-display pb-2 text-jacarta-700 hover:text-accent text-base dark:text-white">
                                        {title}
                                        </h3>
                                    {/* </a>
								</Link> */}

                                <p className="text-white/50">{item.sub_title}</p>
								
							</div>

                                {/* <div className="mt-4 flex items-center justify-between">
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

                                </div> */}
							</div>
						</article>
						)
					})}
				</div>

			</div>

			{loading && (
				<PageLoader />
			)}
		</div>
    )
}