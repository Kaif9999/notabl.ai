import { signIn } from "@/auth";
import Image from "next/image";
import styles from "./signin.module.css";
import { FcGoogle } from "react-icons/fc";
import { login } from "@/lib/actions/auth";
export default function SignIn() {
  return (
    <div className={`${styles.container} flex flex-col items-center justify-center`}>
      <div className={`${styles.leftPanel} border-t-2 border-l-2 border-b-2 border-gray-300 rounded-lg `}>
        <div className={styles.imageContainer}>
          <Image
            src="/dashboard-preview.png"
            alt="Dashboard Preview"
            width={575}
            height={383}
            className={styles.previewImage}
          />
        </div>
      </div>
      
      <div className={`${styles.rightPanel} border-t-2 border-r-2 border-b-2 border-gray-300 rounded-lg `}>
        <div className={styles.signInContainer}>
          <Image
            src="logo.svg"
            alt="Notablr Logo"
            width={166}
            height={57}
            className={styles.logo}
          />
          
          <form action={login}>
            <button type="submit" className={styles.googleButton}>
              <FcGoogle size={24} />
              <span>Sign in with Google</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
