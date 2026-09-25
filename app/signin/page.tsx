import { library } from "@/app/classes/library";

export default function SignIn() {
    return (
        <div className={library.view}>
            <header className={library.head}>
                <h1 className={library.headTitle}>Sign In</h1>
                <p className={library.headSub}>Login.</p>
            </header>
        </div>
    );
}
