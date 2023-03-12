import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { getDefaultCardList, getEventDetails, getVideoDetails, postOrder } from '../../utils/resquests';
import Image from "next/image";
import { getCardImage } from "../card";
import { placeholderImage } from "../../utils/constants";

interface DetailsItemType {
    id: string | number;
    image?: string;
    title: string;
    price: number;
    text?: string;
    celebrity_id?: number;
}

const Payment = () => {
    const router = useRouter();
    const { id, type } = router.query;

    const paymentType = useMemo(() => {
        switch (type) {
            case 'event': return 'event';
            case 'nft': return 'nft';
            case 'yurr': return 'yurr';
            default : return 'none';
        }
    }, [type]);

    const [paymentData, setPaymentData] = useState<DetailsItemType | null>(null);

    const [cardList, setCardList] = useState<CardItem []>([]);
    const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);

    const [imageModal, setImageModal] = useState(false);

    useEffect(() => {
        if (paymentType === 'yurr') {
            getVideoDetails(+(id.toString())).then((res) => {
                
                setPaymentData({
                    id: res.id,
                    image: res.photo || placeholderImage,
                    title: res.name,
                    price: res.price,
                    text: res.detail,
                    celebrity_id: res.celebrity_id
                })
            })
        } else if (paymentType === 'event') {
            getEventDetails(+(id.toString())).then((res) => {
                setPaymentData({
                    id: res.id,
                    image: res.event_photo,
                    title: res.name,
                    price: res.price,
                    text: res.detail,
                    celebrity_id: res.celebrity_id
                })
            })
        }

        getDefaultCardList().then(setCardList);

    }, [id, paymentType])

    const { image, title, price, text } = paymentData || {};

    const disabled = useMemo(() => {
        if (paymentType === 'none') return true;

        return !selectedCard;
    }, [paymentType, selectedCard])

    const handlePayment = () => {
        if (disabled) return;

        // data['type'] = this.type;
        // data['id'] = this.id;
        // data['celebrity_id'] = this.celebrityId;
        // data['note'] = (this.note != null) ? this.note : '';
        // data['selected_day'] = this.selectedDay;
        // data['day_type'] = this.selectedDayType;

        const data = {
            type: paymentType,
            id: paymentData?.id,
            celebrity_id: paymentData?.celebrity_id,
            note: '',
        }

        postOrder(data).then((res) => {
            console.log(res);
        });
    }

    return (
        <section className="relative lg:mt-24 lg:pt-24 lg:pb-24 mt-24 pt-12 pb-24">
            <div className="container">

                <div className="grid md:grid-cols-2 md:gap-10">

                    <div className="flex flex-col justify-center">
                        <figure className="mb-8 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2 w-full">
                            <button className=" w-full h-full" onClick={() => setImageModal(true)}>
                                <img src={image} alt={title} className="rounded-2xl w-full h-[200px] object-contain cursor-pointer  w-full" />
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

                        <div className="w-full flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-center">{title}</h1>
                            <span className="text-green text-md font-semibold tracking-tight">
                                $ {price}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <div
                            className="w-full"
                        >
                            {cardList.map((card, index) => {

                                const { id, image, title } = {
                                    id: card.id,
                                    image: getCardImage(card.brand),
                                    title: 'Ending with ' + card.last4,
                                }

                                return (
                                    <article key={card.id + '-' + index}
                                        className={"mb-4 cursor-pointer rounded-2xl " + (selectedCard?.id === card.id ? 'border-accent border-2' : '')}
                                        onClick={() => setSelectedCard(card)}
                                    >
                                        <div className="flex gap-4 dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl border bg-white p-[1.1875rem] py-1 transition-shadow hover:shadow-lg text-jacarta-500">
                                            <figure>
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

                        <button 
                            disabled={disabled}
                            onClick={handlePayment}
                            className="w-full mt-4 bg-accent shadow-accent-volume hover:bg-accent-dark disabled:bg-jacarta-500 rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                        >
                            Confirm Payment
                        </button>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default Payment;