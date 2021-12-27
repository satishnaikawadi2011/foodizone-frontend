import { useReactiveVar } from '@apollo/client';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHome, faHotel, faPlusSquare, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isDrawerOpen } from '../../apollo';
import { useMeQuery, UserRole } from '../../generated/graphql';
import appLogo from '../../images/logo.svg';

interface SideDrawerProps {}

export interface LinkType {
	title: string;
    icon: IconProp;
    route:string;
}

const CommomnLinks: LinkType[] = [
	{ title: 'Home', icon: faHome,route:'/' },
	{ title: 'Edit Profile', icon: faUserEdit,route:'/edit-profile' }
];

const OwnerLinks: LinkType[] = [
	{ title: 'Add Restaurant', icon: faHotel,route:'/add-restaurant' },
	{ title: 'Add Category', icon: faPlusSquare,route:'/add-category' }
];

const SideDrawer: React.FC<SideDrawerProps> = ({ children }) => {
    const navigate = useNavigate();
    const isOpen = useReactiveVar(isDrawerOpen);
    const {data:userData} = useMeQuery()
	return (
		<main
			className={
				' fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ' +
				(
					isOpen ? ' transition-opacity opacity-100 duration-500 translate-x-0  ' :
					' transition-all delay-500 opacity-0 translate-x-full  ')
			}
		>
			<section
				className={
					' w-screen max-w-xs right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' +
					(
						isOpen ? ' translate-x-0 ' :
						' translate-x-full ')
				}
			>
				<article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
					<aside>
						<span className="flex w-full items-center p-4 border-b">
							<img src={appLogo} className="w-32" alt="FoodiZone" />
						</span>
						{CommomnLinks.map((l) => {
							return (
                                <span onClick={() => {
                                    isDrawerOpen(false);
                                    navigate(l.route);
                                }} className="flex items-center p-4 hover:bg-indigo-500 hover:text-white hover:cursor-pointer ">
									<span className="mr-2">
										<FontAwesomeIcon icon={l.icon} className="text-2xl" />
									</span>
									<span>{l.title}</span>
								</span>
							);
                        })}
                        {userData?.me.role === UserRole.Owner && 
                        OwnerLinks.map((l) => {
							return (
								<span onClick={() => {
                                    isDrawerOpen(false);
                                    navigate(l.route);
                                }} className="flex items-center p-4 hover:bg-indigo-500 hover:text-white hover:cursor-pointer ">
									<span className="mr-2">
										<FontAwesomeIcon icon={l.icon} className="text-2xl" />
									</span>
									<span>{l.title}</span>
								</span>
							);
						})}
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
				</article>
			</section>
			<section
				className=" w-screen h-full cursor-pointer "
				onClick={() => {
					isDrawerOpen(false);
				}}
			/>
		</main>
	);
};

export default SideDrawer;
