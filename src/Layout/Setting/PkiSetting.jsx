import { Input, InputGroup } from "../../components";

import { useSelector, useDispatch } from "react-redux";
import { setValue } from "../../store/pki.apiSlice";

const inputs = [
  {
    name: "protocol",
    isDisabled: true,
    placeholder: "http://",
    className:
      "text-xs px-1 text-center overflow-hidden disabled:border-r-0 h-full",
    widthSize: "w-14",
  },
  {
    name: "domain",
    isDisabled: false,
    placeholder: "127.0.0.1",
    widthSize: "flex-[2]",
    className:
      "leading-4 px-2 rounded-r-0 border-l-0 border-r-[0.5px] flex-1 h-full",
  },
  {
    name: "port",
    isDisabled: false,
    placeholder: "1620",
    widthSize: "flex-1",
    className:
      "px-1 text-center leading-4 w-14 rounded-r border-l-[0.5px] flex-1 h-full",
  },
];

const PkiSetting = ({ label }) => {
  const pkiUrl = useSelector((state) => state.pkiApi);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const payload = {
      searchKey: name,
      value,
    };

    dispatch(setValue(payload));
  };

  return (
    <form
      className="flex flex-row items-end"
      onSubmit={(e) => e.preventDefault()}
    >
      <InputGroup label={label} className="h-full">
        {inputs.map((item) => (
          <div key={item.name} className={item.widthSize}>
            <Input
              disabled={item.isDisabled}
              name={item.name}
              value={pkiUrl[item.name]?.toString()}
              className={item.className}
              placeholder={item.placeholder}
              onChange={handleChange}
            />
          </div>
        ))}
      </InputGroup>
    </form>
  );
};

export default PkiSetting;
