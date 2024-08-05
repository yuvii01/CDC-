import React from 'react'

function landingbox() {
  return (
    <div>
      <div className="w-5/6 h-[500px] bg-[#393D3F] p-5 rounded-3xl mx-auto flex items-center justify-center ">
        <Slider
          {...settings2}
          className="w-1/2 lg:w-2/5 h-full flex items-center justify-center"
        >
          {products.map((prod) => (
            <div key={prod._id} className="h-96 w-full p-3 rounded-3xl">
              <NavLink
                key={prod._id}
                to={`/store/${prod.slug}`}
                className="relative w-full h-full group object-scale-down"
              >
                <div className="w-full h-full rounded-3xl ">
                  <img
                    src={`${API_BASE_URL}${productImageUrl}${prod.image}`}
                    alt={prod.name}
                    className="w-full h-full object-cover absolute z-10 rounded-3xl dp object-center"
                  />
                </div>
              </NavLink>
            </div>
          ))}
        </Slider>
        <div
          className="h-1/2 w-full mx-auto"
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          <h1 className="text-8xl md:text-9xl lg:text-[10rem] font-extrabold tracking-tighter leading-none">
            CREP DOG CREW
          </h1>
        </div>
      </div>
    </div>
  );
}

export default landingbox;