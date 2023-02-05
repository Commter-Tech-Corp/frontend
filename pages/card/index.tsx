import axios from "axios"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"
import PageLoader from "../../components/loader";
import Meta from "../../components/Meta";
import { getCardList } from "../../utils/resquests";

import visa from '../../public/images/card/visa.png'
import mastercard from '../../public/images/card/mastard.png'
import amex from '../../public/images/card/amex.png'
import { placeholderImage } from "../../utils/constants";

const getCardImage = (brand: string) => {
	if (brand.match(/visa/i)) return visa;
	if (brand.match(/mastercard/i)) return mastercard;
	if (brand.match(/amex/i)) return amex;
	return placeholderImage;
}

export default function CardPage () {
    const [cardItems, setCardItems] = useState<CardItem []>([]);
    const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>('')

    useEffect(() => {
        getCardList().then(res => {
            setCardItems(res.sources?.data || []);
        }).finally(() => {
            setLoading(false);
        }).catch(err => {
            setError('Error loading card list');
        });
    }, [])

    return (
        <div className="mt-[95px]">
			<Meta title="Cards || Xhibiter | NFT Marketplace Next.js Template" />
			
			<div className="container">

				<div
				className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4"
				>
					{cardItems.map((card, index) => {
						const detailUrl = '/card/';

						const { id, image, title } = {
							id: card.id,
							image: getCardImage(card.brand),
							title: 'Ending with ' + card.last4,
						}

						return (
							<article key={card.id + '-' + index}>
								<div className="flex gap-4 dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-500">
									<figure>
										{/* {`item/${itemLink}`} */}
										<Link href={detailUrl + id} passHref>
											<a>
												<div className="w-20 h-10 relative">
													<Image
														src={image}
														alt={title}
														layout="fill"
														objectFit="contain"
														objectPosition={'center center'}
														className="rounded-[0.625rem] w-full object-center"
														unoptimized={true}
														placeholder="empty"
													/>
												</div>
											</a>
										</Link>
									</figure>

									<div className="py-2">
										<h3 className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white">
										{title}
										</h3>

										<p>{card.exp_month} / {card.exp_year}</p>
										
									</div>

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