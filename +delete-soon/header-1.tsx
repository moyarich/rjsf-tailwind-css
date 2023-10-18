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
      className="p-3 mb-3 border-bottom border-top"
      style={{ backgroundColor: '#eeeeee' }}
    >
      <div className="mx-auto sm:px-4">
        <div
          id="desktopMenuContainer"
          className="col-12 flex item-center justify-center"
        >
          <a
            href="/"
            className="flex item-center mb-2 mb-lg-0 text-dark no-underline"
          >
            <img
              src={logoSource}
              alt="MedConnect Logo"
              style={{ width: '260px', marginRight: '25px' }}
            />
          </a>
          <ul
            className="menu nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
            style={{ marginTop: '3px' }}
          >
            {menuData.map((menuItem, index) => (
              <li key={index}>
                {menuItem.dropdownItems.length > 0 ? (
                  <div className="menu-item dropdown">
                    <a
                      href={menuItem.url}
                      className="dropdown-trigger nav-item nav-link px-4 link-dark header-link dropdown-toggle uppercase"
                      role="button"
                      id={`ddMenuLink-${index}`}
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {menuItem.title}
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby={`ddMenuLink-${index}`}
                    >
                      {menuItem.dropdownItems.map((dropdownItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={dropdownItem.url}
                          className="dropdown-item"
                        >
                          {dropdownItem.title}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    href={menuItem.url}
                    className="nav-link px-4 link-dark header-link uppercase"
                  >
                    {menuItem.title}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <div className="flex items-end">
            <a href="/login" className="no-underline">
              <img
                src={profileImageSource}
                alt="Account Profile Picture"
                width="52"
                height="52"
                className="rounded-circle"
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
