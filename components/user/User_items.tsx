import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Activity_item from "../collectrions/Activity_item";
import Image from "next/image";
import Trending_categories_items from "../categories/trending_categories_items";
import Explore_collection_item from "../collectrions/explore_collection_item";
import CategoryItem from "../categories/categoryItem";
import Link from "next/link";
import Tippy from "@tippyjs/react";

export const User_items_Celeb = ({
  events,
  calls,
}: {
  events: EventDetailType[];
  calls: VidoeItemType [];
}) => {
  const [itemActive, setItemActive] = useState(1);
  const tabItem = [
    {
      id: 1,
      text: "Events",
      icon: "activity",
    },
    {
      id: 2,
      text: "Calls",
      icon: "on-sale",
    },
    // {
    //   id: 3,
    //   text: "created(20)",
    //   icon: "created",
    // },
    // {
    //   id: 4,
    //   text: "collections",
    //   icon: "listing",
    // },
    // {
    //   id: 5,
    //   text: "Activity",
    //   icon: "activity",
    // },
  ];
  return (
    <>
      <section className="relative py-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          {/* <img src="img/gradient_light.jpg" alt="gradient" className="h-full w-full" /> */}
          <Image
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
            layout="fill"
          />
        </picture>
        <div className="container">
          {/* <!-- Tabs Nav --> */}
          <Tabs className="tabs">
            <TabList className="nav nav-tabs scrollbar-custom mb-12 flex items-center justify-start overflow-x-auto overflow-y-hidden border-b border-jacarta-100 pb-px dark:border-jacarta-600 md:justify-center">
              {tabItem.map(({ id, text, icon }) => {
                return (
                  <Tab
                    className="nav-item"
                    role="presentation"
                    key={id}
                    onClick={() => setItemActive(id)}
                  >
                    <button
                      className={
                        itemActive === id
                          ? "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white active"
                          : "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white"
                      }
                    >
                      <svg className="icon mr-1 h-5 w-5 fill-current">
                        <use xlinkHref={`/icons.svg#icon-${icon}`}></use>
                      </svg>
                      <span className="font-display text-base font-medium">
                        {text}
                      </span>
                    </button>
                  </Tab>
                );
              })}
            </TabList>

            <TabPanel>
              <div>
                {/* <!-- Filter --> */}
                {/* <Trending_categories_items /> */}
                {/* <!-- Grid --> */}
                <div
                  className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4"
                >
                  {events.map((event, index) => {
                    const detailUrl = '/item/';

                    const { id, image, title, price } = {
                      id: event.id,
                      image: event.event_photo,
                      title: event.name,
                      price: event.price,
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

                          {event.schedule && (
                            <div className="mt-2 text-sm">
                              <span className="dark:text-jacarta-300 text-jacarta-500">
                                Schedule: &nbsp;
                              </span>
                              <span className="dark:text-jacarta-100 text-jacarta-700">
                                {event.schedule}
                              </span>
                            </div>
                          )}

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
              </div>
            </TabPanel>

            <TabPanel>
              <div>
                {/* <!-- Filter --> */}
                {/* <Trending_categories_items /> */}
                {/* <!-- Grid --> */}
                <div
                  className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4"
                >
                  {calls.map((call, index) => {
                    const detailUrl = '/video/';

                    const { id, image, title, price } = {
                      id: call.id,
                      image: call.photo || '/images/placeholder.png',
                      title: call.name,
                      price: call.price,
                    }

                    return (
                      <article key={call.id + '-' + index}>
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
              </div>
            </TabPanel>
            {/* <TabPanel>
              <div>
                {/* <!-- Filter --> 
                <Trending_categories_items />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                {/* <!-- Filter --> 
                <Trending_categories_items />
              </div>
            </TabPanel>
            <TabPanel>
              {/* <!-- Grid --> 
              <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-3 lg:grid-cols-4">
                <Explore_collection_item itemFor="userPage" />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <Activity_item />
              </div>
            </TabPanel> */}
          </Tabs>
        </div>
      </section>
    </>
  );
};

const User_items = () => {
  const [itemActive, setItemActive] = useState(1);
  const tabItem = [
    {
      id: 1,
      text: "on sale",
      icon: "on-sale",
    },
    {
      id: 2,
      text: "owned",
      icon: "owned",
    },
    {
      id: 3,
      text: "created(20)",
      icon: "created",
    },
    {
      id: 4,
      text: "collections",
      icon: "listing",
    },
    {
      id: 5,
      text: "Activity",
      icon: "activity",
    },
  ];
  return (
    <>
      <section className="relative py-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          {/* <img src="img/gradient_light.jpg" alt="gradient" className="h-full w-full" /> */}
          <Image
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
            layout="fill"
          />
        </picture>
        <div className="container">
          {/* <!-- Tabs Nav --> */}
          <Tabs className="tabs">
            <TabList className="nav nav-tabs scrollbar-custom mb-12 flex items-center justify-start overflow-x-auto overflow-y-hidden border-b border-jacarta-100 pb-px dark:border-jacarta-600 md:justify-center">
              {tabItem.map(({ id, text, icon }) => {
                return (
                  <Tab
                    className="nav-item"
                    role="presentation"
                    key={id}
                    onClick={() => setItemActive(id)}
                  >
                    <button
                      className={
                        itemActive === id
                          ? "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white active"
                          : "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white"
                      }
                    >
                      <svg className="icon mr-1 h-5 w-5 fill-current">
                        <use xlinkHref={`/icons.svg#icon-${icon}`}></use>
                      </svg>
                      <span className="font-display text-base font-medium">
                        {text}
                      </span>
                    </button>
                  </Tab>
                );
              })}
            </TabList>

            <TabPanel>
              <div>
                {/* <!-- Filter --> */}
                <Trending_categories_items />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                {/* <!-- Filter --> */}
                <Trending_categories_items />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                {/* <!-- Filter --> */}
                <Trending_categories_items />
              </div>
            </TabPanel>
            <TabPanel>
              {/* <!-- Grid --> */}
              <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-3 lg:grid-cols-4">
                <Explore_collection_item itemFor="userPage" />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <Activity_item />
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default User_items;
