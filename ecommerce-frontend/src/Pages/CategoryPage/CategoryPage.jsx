import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CloseIcon from "@mui/icons-material/Close";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { filters, singleFilter } from "./FilterData";
import {
  FormControl,
  FormControlLabel,
  Pagination,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import products from '../../Data/Product';
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../Redux/Customers/Product/ProductAction";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CategoryPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedRadio, setSelectedRadio] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const category = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  
  const dispatch = useDispatch();
  const { loading, products, error ,currentPage,totalPages} = useSelector((state) => state.products);

  // const filteredProducts = products?.filter(item => item.category === category);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.toString();
    dispatch(fetchProducts(query));
  }, [dispatch, location.search]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    // Initialize checkbox filters state
    const filterState = {};
    filters.forEach((section) => {
      const values = searchParams.get(section.id)?.split(",") || [];
      filterState[section.id] = values;
    });
    setSelectedFilters(filterState);

    // Initialize radio button filters state
    const radioState = {};
    singleFilter.forEach((section) => {
      radioState[section.id] = searchParams.get(section.id) || "";
    });
    setSelectedRadio(radioState);
  }, [location.search, filters, singleFilter]);

  const handleFilterChange = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    let filterValues = searchParams.get(sectionId)?.split(",") || [];

    if (filterValues.includes(value)) {
      filterValues = filterValues.filter((item) => item !== value);
      if (filterValues.length === 0) {
        searchParams.delete(sectionId);
      }
    } else {
      filterValues.push(value);
    }

    if (filterValues.length > 0) {
      searchParams.set(sectionId, filterValues.join(","));
    } else {
      searchParams.delete(sectionId);
    }

    const query = searchParams.toString();
    navigate({ search: `?${query}` });
    setSelectedFilters((prevState) => ({
      ...prevState,
      [sectionId]: filterValues,
    }));
  };

  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleRadioFilterChange = (e, sectionId) => {
    const searchParams = new URLSearchParams(location.search);

    if (e.target.value === "") {
      searchParams.delete(sectionId);
    } else {
      searchParams.set(sectionId, e.target.value);
    }

    const query = searchParams.toString();
    navigate({ search: `?${query}` });
    setSelectedRadio((prevState) => ({
      ...prevState,
      [sectionId]: e.target.value,
    }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-white">
      <div>
        <Dialog
          open={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />
          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              checked={
                                selectedFilters[section.id]?.includes(
                                  option.value
                                ) || false
                              }
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              onChange={() =>
                                handleFilterChange(option.value, section.id)
                              }
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}

                {singleFilter.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          value={selectedRadio[section.id] || ""}
                          name={`radio-buttons-group-${section.id}`}
                        >
                          {section.options.map((option, optionIdx) => (
                            <FormControlLabel
                              key={option.value}
                              value={option.value}
                              control={<Radio />}
                              label={option.label}
                              onClick={() => {
                                if (
                                  selectedRadio[section.id] === option.value
                                ) {
                                  handleRadioFilterChange(
                                    { target: { value: "" } },
                                    section.id
                                  ); // Deselect if already selected
                                }
                              }}
                              onChange={(e) => {
                                if (
                                  selectedRadio[section.id] !== option.value
                                ) {
                                  handleRadioFilterChange(e, section.id);
                                }
                              }}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto px-4 lg:px-14 ">
          <div className="flex items-baseline justify-between border-b border-gray-200 py-6">
            <div className="hidden lg:block">
              <button
                className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900 "
                onClick={() => setFiltersVisible(!filtersVisible)}
              >
                Filters
                {!filtersVisible && (
                  <FilterListIcon
                    sx={{ fontSize: 20 }}
                    className="-mr-1 ml-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 "
                    aria-hidden="true"
                  />
                )}
                {filtersVisible && (
                  <CloseIcon
                    sx={{ fontSize: 20 }}
                    className="-mr-1 ml-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
            {!mobileFiltersOpen && (
              <button
                className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                Filters
                {!filtersVisible && (
                  <FilterListIcon
                    sx={{ fontSize: 20 }}
                    className="-mr-1 ml-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 "
                    aria-hidden="true"
                  />
                )}
              </button>
            )}
          </div>

          <section aria-labelledby="products-heading" className=" pb-10">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            <div>
              <div
                className={` grid gap-x-5 ${
                  filtersVisible ? "lg:grid-cols-5" : "lg:grid-cols-5"
                } grid-cols-1`}
              >
                {/* Filters */}
                <div
                  className={`${
                    filtersVisible ? "block" : "hidden"
                  } hidden lg:block col-span-1`}
                >
                  {filtersVisible && (
                    <form className="rounded-md p-4 overflow-auto text-nowrap">
                      {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-b border-gray-200 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-4">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        type="checkbox"
                                        checked={
                                          selectedFilters[section.id]?.includes(
                                            option.value
                                          ) || false
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        onChange={() =>
                                          handleFilterChange(
                                            option.value,
                                            section.id
                                          )
                                        }
                                      />
                                      <label
                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                        className="ml-3 text-sm text-gray-600"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}

                      {singleFilter.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-b border-gray-200 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <FormControl>
                                  <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    value={selectedRadio[section.id] || ""}
                                    name={`radio-buttons-group-${section.id}`}
                                  >
                                    {section.options.map(
                                      (option, optionIdx) => (
                                        <FormControlLabel
                                          key={option.value}
                                          value={option.value}
                                          control={<Radio />}
                                          label={option.label}
                                          onClick={() => {
                                            if (
                                              selectedRadio[section.id] ===
                                              option.value
                                            ) {
                                              handleRadioFilterChange(
                                                { target: { value: "" } },
                                                section.id
                                              ); // Deselect if already selected
                                            }
                                          }}
                                          onChange={(e) => {
                                            if (
                                              selectedRadio[section.id] !==
                                              option.value
                                            ) {
                                              handleRadioFilterChange(
                                                e,
                                                section.id
                                              );
                                            }
                                          }}
                                        />
                                      )
                                    )}
                                  </RadioGroup>
                                </FormControl>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  )}
                </div>

                {/* Product grid */}
                {
                products?.length>0 ?
                <div
                  className={`my-5  ${
                    filtersVisible ? "lg:col-span-4" : "lg:col-span-5"
                  }`}
                >
                  <div
                    className={`grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${
                      filtersVisible ? "4" : "5"
                    } xl:grid-cols-${filtersVisible ? "4" : "3"} `}
                  >
                    {products.map((item) => (
                      <ProductCard key={item.id} product={item} />
                    ))}
                  </div>
                </div>:
                
                <div className={`my-5  ${
                  filtersVisible ? "lg:col-span-4" : "lg:col-span-5"
                } flex flex-col items-center justify-center text-center py-10`}>
                  {console.log(products.length)}
                <img
                  src="/images/empty-state.jpg"
                  alt="No Products"
                  className="w-full h-full mb-6 sm:w-32 sm:h-32"
                />
                <h2 className="text-2xl font-semibold text-gray-800 sm:text-xl">Oops! No Products Found</h2>
                <p className="text-gray-600 mt-2 sm:text-sm">Try adjusting your filters or search for something else.</p>
                <button
                  onClick={() => navigate("/")}
                  className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition-colors duration-300"
                >
                  Go Back Home
                </button>
              </div>
              }
              </div>
            </div>
          </section>
        </main>
        {/* pagination section */}
        <section className="w-full px-[3.6rem]">
          <div className="mx-auto px-4 py-5 flex justify-center shadow-lg border rounded-md">
            <Pagination
              count={totalPages}
              color="primary"
              className=""
              onChange={handlePaginationChange}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
