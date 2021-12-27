import React from 'react';

interface aProps {}

const a: React.FC<aProps> = ({}) => {
	const isOpen = false;
	return (
		<div>
			<aside>
				<span className="flex w-full items-center p-4 border-b">
					<img src="/logos/fox-hub.png" alt="Logo" className="h-auto w-32 mx-auto" />
				</span>
				<span className="flex items-center p-4 hover:bg-indigo-500 hover:text-white ">
					<span className="mr-2">
						<svg
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							viewBox="0 0 24 24"
							className="w-6 h-6"
						>
							<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
						</svg>
					</span>
					<span>Home</span>
				</span>
				<span className="flex items-center p-4 hover:bg-indigo-500 hover:text-white ">
					<span className="mr-2">
						<svg
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							viewBox="0 0 24 24"
							className="w-6 h-6"
						>
							<path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</span>
					<span>Trending Globally</span>
				</span>
				<span className="flex items-center p-4 hover:bg-indigo-500 hover:text-white ">
					<span className="mr-2">
						<svg
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							stroke="currentColor"
							viewBox="0 0 24 24"
							className="w-6 h-6"
						>
							<path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
						</svg>
					</span>
					<span>Wishlist</span>
				</span>
				<span className="flex items-center p-4 hover:bg-indigo-500 hover:text-white ">
					<span className="mr-2">
						<svg
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							viewBox="0 0 24 24"
							className="w-6 h-6"
						>
							<path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</span>
					<span>About</span>
				</span>
				<span className="flex items-center p-4 hover:bg-indigo-500 hover:text-white ">
					<span className="mr-2">
						<svg
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							viewBox="0 0 24 24"
							className="w-6 h-6"
						>
							<path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
					</span>
					<span>Contact</span>
				</span>
				<div className="fixed bottom-0 w-full">
					<button className="flex items-center p-4 text-white bg-blue-500 hover:bg-blue-600 w-full">
						<svg
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							stroke="currentColor"
							viewBox="0 0 24 24"
							className="h-6 w-6 mr-2"
						>
							<path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
						</svg>
						<span>Share</span>
					</button>
				</div>
			</aside>
		</div>
	);
};

export default a;