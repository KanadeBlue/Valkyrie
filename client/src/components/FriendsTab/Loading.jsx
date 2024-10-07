import Skeleton from '@mui/material/Skeleton';

const Loading = () => {
    return (
        <div className="relative flex items-center justify-start w-full h-15 rounded-md">
            <Skeleton className="absolute w-full h-full rounded-md" variant="rounded" />
            <Skeleton className="ml-2" variant="circular" height={40} width={40} />
            <Skeleton className="w-30 ml-2" variant="rounded" height={20} />
        </div>
    );
}

export default Loading;
