import { useState } from "react";
import Item, { MenuItems } from "./Item";
import PkiStatus from "./PkiStatus";
import { Tooltip } from "../../components";

// Assets
import { BrandLogo } from "../../assets";

import "./sidebar.scss";

const Sidebar = () => {
  const [activeBtn, setActiveBtn] = useState("");

  return (
    <nav className={`sidebar__wrapper min-w-[80px] w-20 overflow-auto`}>
      <Tooltip label="webSign" placement="left">
        <div className="header__brand select-none">
          <img src={BrandLogo} alt="Brand logo" draggable={false} />
        </div>
      </Tooltip>

      {/* Menu buttons */}
      <ul className="menu__items">
        {MenuItems.map((item) => (
          <Tooltip key={item.id} placement="right" label={item.tooltip}>
            <Item
              item={item}
              activeBtn={activeBtn}
              setActiveBtn={setActiveBtn}
            />
          </Tooltip>
        ))}
      </ul>

      {/* PKI status */}
      <PkiStatus />
    </nav>
  );
};

export default Sidebar;
