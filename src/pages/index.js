import Image from "next/image";
import data from '../data.json'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function Home() {
  console.log("data", data);
  const { fields: { title, footer, body, banner: { fields: { file: { url: imageUrl }, title: imageTitle } }, products } } = data;

  return (
    <div
      className={` grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 `}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="relative font-sans ">
          <Image src={`https:${imageUrl}`} alt={imageTitle} className=" inset-0 h-fit w-fit lg:w-screen lg:h-screen object-contain" width={1000} height={1000} />

          <div className="min-h-[350px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
            <h2 className="sm:text-4xl text-2xl font-bold mb-6">{title}</h2>
            <div>{documentToReactComponents(body)}</div>
            <p className="sm:text-lg text-base text-center text-gray-200">Embark on unforgettable journeys. Book your dream vacation today!</p>

          </div>
        </div>
        <div className="productsRow flex flex-wrap -m-2 ">
          {console.log(products)}
          {products.map(({ sys: { id: productID },
            fields: { description,
              image: { fields: {
                file: { url }, title } },
              imei,
              name,
              tags } }) => (
            <div key={productID} className="w-full md:w-1/2 lg:w-1/3 px-2">
              <div className="flex flex-col gap-4">
                <Image src={`https:${url}`} alt={title} width={300} height={400} style={{ borderRadius: "30px" }} />
                <h3>MODEL: {name}</h3>
                <p>IMEI: {imei}</p>
                <div className="grid grid-cols-3 gap-4">
                  {tags.map(({ sys: { id: tagId }, fields: { name: tagsName } }) => (
                    <p key={tagId} className="rounded-full bg-indigo-300 text-black p-2 text-center">{tagsName}</p>
                  ))}
                </div>
                <div>{documentToReactComponents(description)}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {footer}
      </footer>
    </div>
  );
}
