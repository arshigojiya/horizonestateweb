import Image from "next/image";
import Link from "next/link";

interface ProductType {
    id: number;
    section: string;
    link: string[];
}

const products: ProductType[] = [
    {
        id: 1,
        section: "Company",
        link: ['About us', 'Blog', 'Contact us', 'Pricing', 'Testimonials'],
    },
    {
        id: 2,
        section: "Support",
        link: ['Help center', 'Terms of service', 'Legal', 'Privacy Policy', 'Status']
    }
]

const footer = () => {
    return (
        <div className="bg-black -mt-64" id="first-section" style={{ marginTop: 10}}>
            <div className="mx-auto max-w-2xl pt-1 pb-10 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mt-24 grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8">
                    <div className='col-span-4'>
                        <Image
                            src="/assets/logo1.png"
                            alt="Courses-Logo"
                            width={100}
                            height={100}
                        />
                        <h3 className='text-white text-lg font-medium leading-9 mb-4 lg:mb-10'> Level up your skills, and get dream <br /> job with passion. </h3>
                        <div className='flex gap-4'>
                            <Link href="/"><Image height={30} width={30} src={'/assets/footer/facebook.png'} alt="facebook" className='footer-icons' /></Link>
                            <Link href="/"><Image height={30} width={30} src={'/assets/footer/instagram.png'} alt="instagram" className='footer-icons' /></Link>
                            <Link href="/"><Image height={30} width={30} src={'/assets/footer/linkedin.png'} alt="linkedin" className='footer-icons' /></Link>
                        </div>
                    </div>
                    {products.map((product) => (
                        <div key={product.id} className="group relative col-span-2">
                            <p className="text-white text-xl font-semibold mb-9">{product.section}</p>
                            <ul>
                                {product.link.map((link: string, index: number) => (
                                    <li key={index} className='mb-5'>
                                        <Link href="/" className="text-white text-sm font-normal mb-6 space-links">{link}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div className='col-span-4'>
                        <h3 className='text-white text-xl font-semibold mb-6'>Stay up to date</h3>
                        <div className="relative  flex flex-row-reverse">
                            <input type="Email address" name="q" className="py-4 text-sm w-full bg-gray-900 rounded-md pl-4 focus:outline-none bg-white " placeholder="Your email address" autoComplete="off" />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <button type="submit" className="p-1 focus:outline-none focus:shadow-outline" style={{ color: 'black' }}>
                                    send
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='pb-10 px-1'>
                <h3 className='text-center text-offwhite'>@2023 - All Rights Reserved by <Link href="#" target="_blank"> Adminmart.com</Link></h3>
            </div>

        </div>
    )
}

export default footer;
