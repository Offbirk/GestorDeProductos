import { Alert } from "flowbite-react";
import { useEffect } from "react";

interface AlertProps {
    alert: {
        message: string;
        type: "success" | "failure" | null
    };
    setAlert: React.Dispatch<React.SetStateAction<{
        message: string;
        type: "success" | "failure" | null
    }>>;
}

const AlertCustom = ({ alert, setAlert }: AlertProps) => {
    useEffect(() => {
        if (alert.type) {
            const timer = setTimeout(() => {
                setAlert({ message: "", type: null });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    return (
        <div>
        {alert.type && (
            <Alert color={alert.type}>
                <span className="font-medium">{alert.message}</span>
            </Alert>)
        }
        </div>
    );
}

export default AlertCustom;