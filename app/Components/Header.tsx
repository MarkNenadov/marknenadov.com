import SocialMediaLinks from './SocialMediaLinks';

export const Header = () => {
  return (
    <header className="text-center space-y-4">
      <h1 className="text-6xl font-bold">Mark Nenadov</h1>
      <p className="text-xl text-gray-600">Software Engineer & Technical Leader</p>
      <SocialMediaLinks />
    </header>
  );
}; 