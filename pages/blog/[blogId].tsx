import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import GearLoading from '../../components/GearLoading';
import { useBlogData, usePublishedBlog } from '../../hooks/blogHooks';

type Props = {};

const BlogPage = (props: Props) => {
  const router = useRouter();
  const blogId = router.query.blogId as string;
  const publishedBlogAddress = usePublishedBlog(parseInt(blogId));
  const data = useBlogData(publishedBlogAddress!);

  const { categories, description, image, owner, social, title, ownerWallet } =
    data;

  if (
    !title ||
    !description ||
    !image ||
    !owner ||
    !social ||
    !categories ||
    !ownerWallet
  )
    return <GearLoading loadingMessage="Loading Blog...." />;

  return (
    <article className="px-10 pb-28 space-y-4">
      <section className="space-y-2 border border-froly-500 text-white">
        <div className="relative min-h-56 flex flex-col md:flex-row justify-between">
          <div className="absolute top-0 w-full h-full opacity-10 blur-sm p-10">
            <Image
              className="object-cover object-center mx-auto"
              src={image}
              alt={title}
              fill
            />
          </div>

          <section className="p-5 bg-froly-500 w-full">
            <div className="flex flex-col md:flex-row justify-between gap-y-5">
              <div className="">
                <h1 className="text-4xl font-extrabold">{title}</h1>
                <p>
                  {/* {new Date(post._createdAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })} */}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                {/* <Image
                  className="rounded-full"
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                  height={40}
                  width={40}
                /> */}

                <div className="">
                  <h3 className="text-lg font-bold whitespace-nowrap">
                    {owner}
                  </h3>
                  <div className="">{ownerWallet}</div>
                </div>
              </div>
            </div>

            <h2 className="italic pt-10 line-clamp-3">{description}</h2>
            <div className="flex items-center justify-end mt-auto space-x-2">
              {categories.split(' ').map((category, id) => {
                return (
                  <p
                    key={id}
                    className="bg-background-secondary text-white px-3 py-1 rounded-full text-sm font-semibold mt-4"
                  >
                    {category}
                  </p>
                );
              })}
            </div>
          </section>
        </div>
      </section>

      <div className="dark:text-text-color-primary space-y-8">
        <div className="h-96 w-full relative">
          <Image src={image} alt={owner} fill className="object-cover" />
        </div>
        {description.split('\n').map((para, id) => {
          return <p key={id}>{para}</p>;
        })}
      </div>
    </article>
  );
};

export default BlogPage;
