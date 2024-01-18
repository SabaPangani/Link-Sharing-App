interface Props {
  fill: string;
}
export default function LinkSvg({ fill }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
    >
      <path
        d="M9.15399 12.6509C9.24139 12.738 9.31074 12.8415 9.35806 12.9554C9.40537 13.0694 9.42973 13.1916 9.42973 13.3149C9.42973 13.4383 9.40537 13.5605 9.35806 13.6745C9.31074 13.7884 9.24139 13.8919 9.15399 13.979L8.68993 14.4431C7.81057 15.3224 6.61791 15.8164 5.3743 15.8164C4.1307 15.8164 2.93804 15.3224 2.05868 14.4431C1.17932 13.5637 0.685303 12.371 0.685303 11.1274C0.685303 9.88384 1.17932 8.69117 2.05868 7.81181L3.94305 5.92822C4.78796 5.08122 5.92476 4.58933 7.12057 4.55331C8.31639 4.51729 9.48073 4.93986 10.3751 5.73447C10.4674 5.81655 10.5427 5.91601 10.5966 6.02717C10.6505 6.13833 10.682 6.25902 10.6892 6.38235C10.6965 6.50568 10.6794 6.62923 10.6389 6.74595C10.5984 6.86266 10.5353 6.97026 10.4532 7.06259C10.3711 7.15493 10.2717 7.2302 10.1605 7.28409C10.0493 7.33799 9.92866 7.36947 9.80533 7.37672C9.682 7.38398 9.55845 7.36687 9.44174 7.32638C9.32502 7.28588 9.21742 7.2228 9.12509 7.14072C8.58877 6.66441 7.89074 6.41102 7.17377 6.43237C6.4568 6.45371 5.77508 6.74819 5.26805 7.25556L3.38524 9.13681C2.85771 9.66435 2.56135 10.3798 2.56135 11.1259C2.56135 11.8719 2.85771 12.5874 3.38524 13.1149C3.91277 13.6425 4.62826 13.9388 5.3743 13.9388C6.12035 13.9388 6.83583 13.6425 7.36337 13.1149L7.82743 12.6509C7.9145 12.5637 8.01789 12.4946 8.1317 12.4474C8.24551 12.4002 8.36751 12.3759 8.49071 12.3759C8.61391 12.3759 8.73591 12.4002 8.84972 12.4474C8.96353 12.4946 9.06692 12.5637 9.15399 12.6509ZM14.9415 1.55713C14.0614 0.67912 12.869 0.186035 11.6259 0.186035C10.3827 0.186035 9.19032 0.67912 8.31024 1.55713L7.84618 2.02119C7.67006 2.19731 7.57112 2.43618 7.57112 2.68525C7.57112 2.93432 7.67006 3.17319 7.84618 3.34931C8.0223 3.52543 8.26117 3.62438 8.51024 3.62438C8.75931 3.62438 8.99818 3.52543 9.1743 3.34931L9.63837 2.88525C10.1659 2.35772 10.8814 2.06135 11.6274 2.06135C12.3735 2.06135 13.089 2.35772 13.6165 2.88525C14.144 3.41278 14.4404 4.12827 14.4404 4.87431C14.4404 5.62036 14.144 6.33584 13.6165 6.86338L11.7329 8.74775C11.2254 9.25491 10.5433 9.54896 9.82618 9.56973C9.10903 9.5905 8.41105 9.33641 7.87509 8.85947C7.78275 8.77739 7.67515 8.71431 7.55844 8.67381C7.44172 8.63332 7.31817 8.61621 7.19484 8.62347C7.07152 8.63072 6.95082 8.6622 6.83966 8.7161C6.7285 8.76999 6.62904 8.84526 6.54696 8.9376C6.46488 9.02993 6.4018 9.13753 6.36131 9.25424C6.32081 9.37096 6.30371 9.49451 6.31096 9.61784C6.31821 9.74117 6.34969 9.86186 6.40359 9.97302C6.45748 10.0842 6.53275 10.1836 6.62509 10.2657C7.51882 11.0601 8.68238 11.483 9.87763 11.4477C11.0729 11.4124 12.2095 10.9217 13.0548 10.0759L14.9391 8.19228C15.8182 7.31242 16.3121 6.1197 16.3126 4.87597C16.313 3.63224 15.8199 2.43917 14.9415 1.55869V1.55713Z"
        fill={fill}
      />
    </svg>
  );
}