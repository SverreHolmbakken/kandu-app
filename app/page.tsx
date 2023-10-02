import Header from './components/layout/header';
import Aside from './components/layout/aside';
import Main from './components/layout/main';

export default function Home() {
	return (
		<main className='flex h-screen flex-col justify-between max-w-7xl m-auto text-primaryDark'>
			<Header />
			<section className='flex w-full h-screen'>
				<Aside />
				<Main />
			</section>
		</main>
	);
}
