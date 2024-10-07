import { Routes, Route } from 'react-router-dom';

// * COMPONENTS * //
import HomeSidebar from './HomeSidebar';
import GuildSidebar from './GuildSidebar';
import UserID from '../UserID/UserID';

const Sidebar = () => {
    return (
        <aside className="relative min-w-[250px] h-screen bg-maastricht-blue z-0 p-[calc(var(--base-padding)+3px)] px-4">
            <Routes>
                <Route path={'@me/*'} element={<HomeSidebar />} />
                <Route path={':guildID/*'} element={<GuildSidebar />} />
            </Routes>
            <UserID />
        </aside>
    );
};

export default Sidebar;
