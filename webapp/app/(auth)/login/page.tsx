import LoginForm from "@/components/LoginForm/login-form";
import Image from "next/image";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen">
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <h2 className="mb-6 text-3xl font-extrabold text-gray-900">Connexion</h2>
                    <LoginForm />
                </div>
            </div>
            <div className="relative hidden w-0 flex-1 lg:block">
                <Image
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://placehold.co/1920x1080"
                    alt="Login background image"
                    width={1920}
                    height={1080}
                />
            </div>
        </div>
    )
}