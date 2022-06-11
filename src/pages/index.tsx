import Link from 'next/link';
import Layout from '../components/Layout';
import trpc from '../utils/trpc';
const IndexPage = () => {
	const { data, isLoading } = trpc.useQuery(["hello", { text: "heloo" }]);

	return (
		<Layout title='Home | Next.js + TypeScript Example'>
			<p className='underline'> hello world</p>
		</Layout>
	);
};

export default IndexPage;

