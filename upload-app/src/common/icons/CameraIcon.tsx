type Props = { className?: string };

export const CameraIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      width='26'
      height='26'
      viewBox='0 0 26 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.86796 0.0107341C9.63899 0.0367433 9.36589 0.117643 9.15474 0.222004C8.46042 0.565182 7.99459 1.24241 7.92807 2.00534C7.92182 2.077 7.91835 2.65373 7.91828 3.62837L7.91819 5.14025L5.69749 5.14331C3.26241 5.14667 3.4384 5.14273 3.11555 5.20118C2.08585 5.38763 1.16961 6.0065 0.60112 6.89951C0.271651 7.41706 0.0740343 8.01316 0.0265359 8.6327C0.0190703 8.73005 0.0170696 10.6632 0.0192833 15.6584L0.0223307 22.5497L0.0426064 22.6888C0.0834636 22.969 0.127646 23.1627 0.203756 23.3953C0.628574 24.6936 1.73968 25.6731 3.0785 25.9295C3.24759 25.9619 3.38997 25.9793 3.58079 25.9909C3.69753 25.998 6.47179 26 13.1191 25.9977C21.8605 25.9947 22.5013 25.9934 22.6179 25.9788C23.2674 25.8973 23.7892 25.7074 24.306 25.3644C25.1687 24.7919 25.7592 23.891 25.9384 22.8739C25.9638 22.7299 25.9886 22.5076 25.991 22.4041L25.9925 22.3367L25.9987 22.3876C26.0021 22.4156 26.0049 19.3416 26.0048 15.5565C26.0048 11.7713 26.0023 8.70356 25.9994 8.73922C25.9945 8.79929 25.9936 8.79486 25.9874 8.67902C25.9585 8.13487 25.7874 7.55735 25.5099 7.06733C25.2478 6.6044 24.8703 6.17831 24.4519 5.87328L24.3731 5.81588L24.3679 6.26793C24.3623 6.74542 24.3599 6.77472 24.3126 6.94349C24.2563 7.14406 24.1533 7.343 24.0195 7.50953C23.996 7.53888 23.9731 7.56751 23.9687 7.57317C23.9637 7.57964 23.9904 7.62769 24.0406 7.70284C24.2524 8.0197 24.3754 8.37711 24.4054 8.76255C24.4182 8.92689 24.418 22.2147 24.4053 22.3747C24.3621 22.9144 24.1438 23.3909 23.7667 23.768C23.388 24.1467 22.9158 24.3634 22.3743 24.407C22.2887 24.4139 19.4544 24.416 12.92 24.4141C4.00703 24.4114 3.58357 24.4105 3.49069 24.3947C2.96895 24.3059 2.57005 24.1012 2.22113 23.7433C1.90561 23.4196 1.71284 23.0388 1.62626 22.5682L1.60581 22.4571L1.60303 15.6352C1.60099 10.6329 1.60303 8.78491 1.61067 8.7068C1.68599 7.93685 2.15905 7.26731 2.86406 6.9328C3.04058 6.84905 3.22878 6.79019 3.449 6.74984L3.56016 6.72948L6.53101 6.7269L9.50187 6.72434L9.50429 4.40652L9.50672 2.08871L9.52847 2.02387C9.56517 1.91441 9.6032 1.8532 9.68726 1.76821C9.74942 1.70538 9.78214 1.68058 9.84214 1.65083C9.99062 1.5772 9.69905 1.58312 13.0358 1.58597L16.0183 1.58853L16.0862 1.61334C16.1844 1.6492 16.2497 1.69085 16.3236 1.76483C16.3976 1.8388 16.4393 1.90408 16.4751 2.00224L16.4999 2.07018L16.5024 4.3974L16.5048 6.72462H18.8769C21.1327 6.72462 21.2486 6.72382 21.2416 6.70841C21.2375 6.6995 21.2326 6.49563 21.2305 6.25537L21.2268 5.81856L20.79 5.81422C20.3947 5.81028 20.3431 5.80799 20.2474 5.79012C20.0333 5.75016 19.7934 5.64952 19.62 5.52697C19.5201 5.45636 19.3572 5.30102 19.2869 5.20918L19.2345 5.14072H18.6617H18.0889L18.0861 3.54061C18.0831 1.77203 18.0876 1.91031 18.0239 1.6579C17.9855 1.50605 17.9371 1.37702 17.8606 1.22266C17.6483 0.794698 17.3091 0.451724 16.8866 0.237991C16.6781 0.132555 16.4885 0.0691901 16.2499 0.0252578L16.1387 0.00479678L13.0404 0.0035556C11.2334 0.00283312 9.91118 0.00582493 9.86796 0.0107341ZM22.6457 1.19884C22.4989 1.2299 22.3675 1.2989 22.259 1.40202C22.1505 1.505 22.0749 1.63092 22.0317 1.78024C22.0126 1.84634 22.0121 1.86626 22.009 2.65604L22.0058 3.4642H21.2243C20.3792 3.4642 20.3758 3.46437 20.242 3.51469C20.1023 3.56727 19.9547 3.68211 19.8738 3.80118C19.7757 3.94555 19.7327 4.08689 19.734 4.26078C19.7351 4.39367 19.7544 4.48218 19.8064 4.59186C19.9204 4.83266 20.1479 5.00133 20.4087 5.03849C20.4476 5.04402 20.7809 5.0478 21.2397 5.04791L22.0058 5.04809L22.0087 5.85162C22.0116 6.65128 22.0117 6.6555 22.0324 6.72925C22.1115 7.01164 22.31 7.21419 22.5862 7.29421C22.9683 7.40494 23.3789 7.20532 23.5331 6.83382C23.5909 6.69448 23.5904 6.70257 23.5904 5.8358V5.04809H24.3626C25.0119 5.04809 25.1477 5.04585 25.2156 5.03401C25.5355 4.97822 25.791 4.72901 25.8556 4.40959C25.8764 4.3066 25.87 4.13787 25.8415 4.03884C25.7791 3.82216 25.6234 3.63879 25.4198 3.54222C25.2567 3.46483 25.3261 3.47003 24.4081 3.46659L23.591 3.46353L23.5882 2.64644L23.5854 1.82935L23.5642 1.76025C23.5171 1.60694 23.417 1.45528 23.3009 1.3616C23.2343 1.30783 23.0834 1.23058 23.0023 1.20877C22.9253 1.18809 22.7231 1.18246 22.6457 1.19884ZM20.0244 7.78081C19.3354 7.84103 18.7705 8.34981 18.633 9.0338C18.6155 9.1209 18.6122 9.16791 18.612 9.32739C18.6118 9.53807 18.6269 9.64274 18.682 9.81125C18.8435 10.3053 19.2606 10.6996 19.7574 10.8275C19.913 10.8676 19.9945 10.8778 20.1587 10.8778C20.3224 10.8778 20.4049 10.8675 20.5569 10.8281C20.9848 10.7173 21.3496 10.4187 21.5528 10.0128C21.6027 9.91336 21.6659 9.721 21.6883 9.60064C21.7144 9.46034 21.712 9.16371 21.6837 9.0321C21.5926 8.6089 21.3631 8.26588 21.0153 8.03322C20.7346 7.8455 20.3641 7.75111 20.0244 7.78081ZM12.7347 8.37957C11.6992 8.42506 10.7397 8.67492 9.84017 9.13332C7.90091 10.1216 6.52554 11.9677 6.14062 14.0991C6.02151 14.7586 5.99743 15.4554 6.07072 16.1215C6.18689 17.1772 6.54213 18.1899 7.11051 19.0855C8.01907 20.5171 9.42015 21.573 11.0434 22.0492C12.1174 22.3643 13.2801 22.4142 14.3839 22.1925C15.5774 21.9528 16.6673 21.4146 17.5976 20.6056C17.7371 20.4842 18.0628 20.1626 18.1942 20.0164C19.028 19.0885 19.5942 17.9669 19.8424 16.7513C20.0134 15.9136 20.0294 15.0456 19.8894 14.2041C19.5063 11.9026 17.9863 9.93541 15.8532 8.98066C14.8855 8.54755 13.7766 8.33379 12.7347 8.37957ZM0.0218305 15.5657C0.0218305 19.3509 0.0228864 20.898 0.0241739 19.0037C0.0254614 17.1094 0.0254614 14.0125 0.0241739 12.1216C0.0228864 10.2307 0.0218305 11.7806 0.0218305 15.5657ZM12.656 9.96726C10.5339 10.1073 8.70058 11.4705 7.94942 13.467C7.78998 13.8908 7.68905 14.3314 7.63421 14.8432C7.61414 15.0305 7.61093 15.6229 7.62899 15.8066C7.65936 16.1154 7.69931 16.3601 7.76131 16.617C7.95873 17.4351 8.32581 18.1616 8.87743 18.8261C9.0033 18.9778 9.3774 19.3522 9.52936 19.4787C10.748 20.4926 12.282 20.9209 13.8416 20.6825C15.3069 20.4585 16.6327 19.6149 17.4795 18.3677C18.4151 16.9895 18.6538 15.2312 18.1214 13.6391C17.5628 11.969 16.2198 10.6744 14.5277 10.1753C14.148 10.0632 13.7544 9.99457 13.3322 9.96671C13.1728 9.95619 12.8194 9.95648 12.656 9.96726Z'
        fill='white'
        className={className}
      />
    </svg>
  );
};
