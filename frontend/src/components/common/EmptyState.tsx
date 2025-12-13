
interface EmptyStateProps {
    title: string;
    message: string;
    icon?: string;
    actionLabel?: string;
    onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    message,
    icon,
    actionLabel,
    onAction,
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            {icon && <div className="text-8xl mb-4 animate-bounce-slow">{icon}</div>}
            <h3 className="heading-3 text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 text-center mb-6 max-w-md text-body">{message}</p>
            {actionLabel && onAction && (
                <button onClick={onAction} className="btn-primary">
                    {actionLabel}
                </button>
            )}
        </div>
    );
};

export default EmptyState;
