import { client } from '../lib/client';
import HeroBanner from '../components/HeroBanner';
import Product from '../components/Product';

function Home({ products, bannerData }) {
	console.log({
		products,
		bannerData,
	});
	return (
		<div>
			{/* <h1>Hero Banner</h1> */}
			<HeroBanner heroBanner={bannerData.length && bannerData[0]} />
			<div className='product-heading'>
				<h2>Best Selling Products</h2>
				<p>Speakers of many variants</p>
			</div>

			<div className='product-container'>
				{products.map((product) => (
					<Product key={product._id} product={product} />
				))}
			</div>
		</div>
	);
}

export const getServerSideProps = async () => {
	const query = '*[_type == "product"]';
	const products = await client.fetch(query);

	const bannerQuery = '*[_type == "banner"]';
	const bannerData = await client.fetch(bannerQuery);

	return {
		props: { products, bannerData },
	};
};

export default Home;
