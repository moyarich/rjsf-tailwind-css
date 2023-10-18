'use client';

import React from 'react';

interface MenuItem {
  title: string;
  url: string;
  dropdownItems: DropdownItem[];
}

interface DropdownItem {
  title: string;
  url: string;
}

const Header: React.FC = () => {
  const menuData: MenuItem[] = [
    {
      title: 'Home',
      url: '/',
      dropdownItems: [],
    },
    {
      title: 'Therapeutic Areas',
      url: '/TherapeuticAreas',
      dropdownItems: [
        {
          title: 'Cardiovascular, Renal & Metabolism',
          url: '/TherapeuticArea/1',
        },
        { title: 'Type 2 Diabetes', url: '/Disease/1' },
        { title: 'Heart Failure', url: '/Disease/4' },
        { title: 'Chronic Kidney Disease', url: '/Disease/5' },
      ],
    },
    {
      title: 'Brands',
      url: '/Brands',
      dropdownItems: [
        { title: 'Fasenra', url: '/Brand/181/Fasenra' },
        { title: 'Forxiga', url: '/Brand/1/Forxiga' },
        { title: 'Lynparza', url: '/Brand/2/Lynparza' },
        // Add more items
      ],
    },
    // Add more menu items as needed
  ];

  const logoSource = '/images/logos/logo-7-medconnect.png';
  const profileImageSource = '/images/test-login.png';

  return (
    <header
      className="py-6 px-3 mb-3 border-b border-t"
      style={{ backgroundColor: '#eeeeee' }}
    >
      <div className="mx-auto sm:px-4">
        <div id="desktopMenuContainer" className="w-full flex m-auto">
          <a href="/" className="mr-[25px] w-64 no-underline">
            <img className="w-full" src={logoSource} alt="MedConnect Logo" />
          </a>
          <ul className="menu flex list-none p-0 m-0 gap-4">
            {menuData.map((menuItem, index) => (
              <li key={index} className="p-0 m-0">
                {menuItem.dropdownItems.length > 0 ? (
                  <div className="menu-item relative">
                    <a
                      href={menuItem.url}
                      className="dropdown-trigger py-2 px-4 no-underline uppercase"
                      role="button"
                      id={`ddMenuLink-${index}`}
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {menuItem.title}
                    </a>
                    <div
                      className="dropdown-menu-item-wrapper hidden flex flex-col py-2 mt-1"
                      aria-labelledby={`ddMenuLink-${index}`}
                    >
                      {menuItem.dropdownItems.map((dropdownItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={dropdownItem.url}
                          className="dropdown-menu-item block w-full py-1 px-6 font-normal text-gray-900 whitespace-no-wrap border-0"
                        >
                          {dropdownItem.title}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    href={menuItem.url}
                    className="py-2 px-4 no-underline uppercase"
                  >
                    {menuItem.title}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <div className="flex flex-1 justify-end">
            <a href="/login" className="no-underline w-14">
              <img
                src={profileImageSource}
                alt="Profile"
                className="rounded-full"
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
