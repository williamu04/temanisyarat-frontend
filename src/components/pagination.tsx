import arrowBackward from "../../assets/mobile/icons/arrow-backward.svg";
import arrowForward from "../../assets/web/icons/arrow-forward.svg";
import { InlineImage } from "@/components/page-chrome";

type PaginationProps = {
  currentPage?: number;
};

export function Pagination({ currentPage = 1 }: PaginationProps) {
  return (
    <div className="inline-flex w-[192px] items-center justify-between rounded-[24px] bg-[#e5e8fa] px-8 py-3">
      <button
        type="button"
        className="p-1 opacity-40"
        disabled
        aria-label="Halaman sebelumnya"
      >
        <InlineImage src={arrowBackward} alt="" className="h-6 w-6" />
      </button>

      <span className="rounded-[12px] bg-[#0000cc] px-4 py-2 text-[16px] font-semibold text-white">
        {currentPage}
      </span>

      <button
        type="button"
        className="p-1 opacity-40"
        disabled
        aria-label="Halaman selanjutnya"
      >
        <InlineImage src={arrowForward} alt="" className="h-6 w-6" />
      </button>
    </div>
  );
}
