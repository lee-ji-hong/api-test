interface TabBarIconProps {
  title?: string;
  isActive?: boolean;
}

const TabBarBoardIcon = ({ title, isActive }: TabBarIconProps) => {
  return isActive ? (
    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <mask id="path-1-inside-1_2045_7748" fill="white">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.0732 18.9933C10.0698 18.9902 10.0719 18.9845 10.0765 18.9842C15.0663 18.6983 19.0244 14.5614 19.0244 9.5C19.0244 4.25329 14.7711 0 9.52441 0C4.27771 0 0.0244141 4.25329 0.0244141 9.5C0.0244141 11.4295 0.599673 13.2247 1.58804 14.7234C1.8596 15.1352 1.84494 15.6845 1.51078 16.0473L0.334106 17.3248C-0.256135 17.9657 0.198414 19.0023 1.06965 19.0023H10.0697C10.0745 19.0023 10.0768 18.9965 10.0732 18.9933Z"
        />
      </mask>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.0732 18.9933C10.0698 18.9902 10.0719 18.9845 10.0765 18.9842C15.0663 18.6983 19.0244 14.5614 19.0244 9.5C19.0244 4.25329 14.7711 0 9.52441 0C4.27771 0 0.0244141 4.25329 0.0244141 9.5C0.0244141 11.4295 0.599673 13.2247 1.58804 14.7234C1.8596 15.1352 1.84494 15.6845 1.51078 16.0473L0.334106 17.3248C-0.256135 17.9657 0.198414 19.0023 1.06965 19.0023H10.0697C10.0745 19.0023 10.0768 18.9965 10.0732 18.9933Z"
        fill="#4169E1"
      />
      <path
        d="M0.334106 17.3248L-0.842766 16.2409L0.334106 17.3248ZM1.58804 14.7234L2.92373 13.8425L1.58804 14.7234ZM1.51078 16.0473L2.68765 17.1313L1.51078 16.0473ZM10.0765 18.9842L10.168 20.5816L10.0765 18.9842ZM17.4244 9.5C17.4244 13.7084 14.1329 17.1492 9.98497 17.3868L10.168 20.5816C15.9996 20.2474 20.6244 15.4144 20.6244 9.5H17.4244ZM9.52441 1.6C13.8875 1.6 17.4244 5.13695 17.4244 9.5H20.6244C20.6244 3.36964 15.6548 -1.6 9.52441 -1.6V1.6ZM1.62441 9.5C1.62441 5.13695 5.16136 1.6 9.52441 1.6V-1.6C3.39405 -1.6 -1.57559 3.36964 -1.57559 9.5H1.62441ZM2.92373 13.8425C2.10247 12.5973 1.62441 11.1069 1.62441 9.5H-1.57559C-1.57559 11.7522 -0.903121 13.8522 0.252358 15.6043L2.92373 13.8425ZM1.51098 18.4088L2.68765 17.1313L0.333908 14.9633L-0.842766 16.2409L1.51098 18.4088ZM10.0697 17.4023H1.06965V20.6023H10.0697V17.4023ZM-0.842766 16.2409C-2.37739 17.907 -1.19557 20.6023 1.06965 20.6023V17.4023C1.5924 17.4023 1.86512 18.0243 1.51098 18.4088L-0.842766 16.2409ZM0.252358 15.6043C0.167294 15.4753 0.113227 15.2029 0.333908 14.9633L2.68765 17.1313C3.57665 16.166 3.5519 14.7951 2.92373 13.8425L0.252358 15.6043ZM10.0697 20.6023C11.537 20.6023 12.2352 18.7963 11.1495 17.8093L8.99699 20.1772C7.91834 19.1966 8.61203 17.4023 10.0697 17.4023V20.6023ZM9.98497 17.3868C8.60609 17.4659 7.91371 19.1924 8.99699 20.1772L11.1495 17.8093C12.226 18.7879 11.5377 20.5031 10.168 20.5816L9.98497 17.3868Z"
        fill="#4169E1"
        mask="url(#path-1-inside-1_2045_7748)"
      />
      <circle cx="9.52378" cy="9.77964" r="0.838235" fill="white" stroke="white" stroke-width="0.5" />
      <circle cx="6.17124" cy="9.77964" r="0.838235" fill="white" stroke="white" stroke-width="0.5" />
      <circle cx="12.8773" cy="9.77964" r="0.838235" fill="white" stroke="white" stroke-width="0.5" />
    </svg>
  ) : (
    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <mask id="path-1-inside-1_2045_7591" fill="white">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.0733 18.9933C10.0699 18.9902 10.0719 18.9845 10.0765 18.9843C15.0667 18.6988 19.0254 14.5617 19.0254 9.5C19.0254 4.25329 14.7721 0 9.52539 0C4.27869 0 0.0253906 4.25329 0.0253906 9.5C0.0253906 11.4293 0.600509 13.2243 1.58866 14.7229C1.86017 15.1346 1.84549 15.6839 1.51135 16.0467L0.334106 17.3248C-0.256135 17.9657 0.198414 19.0023 1.06965 19.0023H10.0698C10.0745 19.0023 10.0768 18.9965 10.0733 18.9933Z"
        />
      </mask>
      <path
        d="M0.334106 17.3248L-0.842766 16.2409L0.334106 17.3248ZM1.51135 16.0467L0.334476 14.9627L1.51135 16.0467ZM10.0765 18.9843L9.98515 17.3869L10.0765 18.9843ZM17.4254 9.5C17.4254 13.7087 14.1335 17.1496 9.98515 17.3869L10.1679 20.5817C16 20.2481 20.6254 15.4148 20.6254 9.5H17.4254ZM9.52539 1.6C13.8884 1.6 17.4254 5.13695 17.4254 9.5H20.6254C20.6254 3.36964 15.6558 -1.6 9.52539 -1.6V1.6ZM1.62539 9.5C1.62539 5.13695 5.16234 1.6 9.52539 1.6V-1.6C3.39503 -1.6 -1.57461 3.36964 -1.57461 9.5H1.62539ZM2.9244 13.8421C2.10333 12.5969 1.62539 11.1067 1.62539 9.5H-1.57461C-1.57461 11.7519 -0.90231 13.8517 0.25291 15.6037L2.9244 13.8421ZM1.51098 18.4088L2.68822 17.1306L0.334476 14.9627L-0.842766 16.2409L1.51098 18.4088ZM10.0698 17.4023H1.06965V20.6023H10.0698V17.4023ZM-0.842766 16.2409C-2.37739 17.907 -1.19557 20.6023 1.06965 20.6023V17.4023C1.5924 17.4023 1.86512 18.0243 1.51098 18.4088L-0.842766 16.2409ZM0.25291 15.6037C0.167857 15.4747 0.113809 15.2023 0.334476 14.9627L2.68822 17.1306C3.57717 16.1655 3.55248 14.7946 2.9244 13.8421L0.25291 15.6037ZM10.0698 20.6023C11.537 20.6023 12.2352 18.7963 11.1495 17.8094L8.99703 20.1772C7.91836 19.1967 8.61205 17.4023 10.0698 17.4023V20.6023ZM9.98515 17.3869C8.60636 17.4658 7.91356 19.1923 8.99703 20.1772L11.1495 17.8094C12.2262 18.7881 11.5375 20.5033 10.1679 20.5817L9.98515 17.3869Z"
        fill="#333347"
        mask="url(#path-1-inside-1_2045_7591)"
      />
      <circle cx="9.52573" cy="9.77964" r="0.838235" fill="#333347" stroke="#333347" stroke-width="0.5" />
      <circle cx="6.17222" cy="9.77964" r="0.838235" fill="#333347" stroke="#333347" stroke-width="0.5" />
      <circle cx="12.8773" cy="9.77964" r="0.838235" fill="#333347" stroke="#333347" stroke-width="0.5" />
    </svg>
  );
};
export default TabBarBoardIcon;
