import { useState } from "react";

type Props<T> = {
    items: T[];
    itemsPerPage: number
}

export function userPagination<T> ({items, itemsPerPage}: Props<T>) {

//states para paginação
  const [currentPage, setCurrentPage] = useState<number>(1);

 //numero de páginas
  const totalPages = Math.ceil(items.length / itemsPerPage);
  console.log("numero de paginas:", totalPages);

    function moveToNextPage() {
        if (currentPage >= totalPages) return;
        setCurrentPage(currentPage + 1);
      }
    
      function moveToPreviousPage() {
        if (currentPage === 1) return;
        setCurrentPage(currentPage - 1);
      }
    
      function moveToFirstPage() {
        if (currentPage === 1) return;
        setCurrentPage(1);
      }
    
      function moveToLastPage() {
        if (currentPage <= totalPages) {
          setCurrentPage(totalPages);
        }
      }
    
      function moveToPageOnClick(selectedPage: number) {
        setCurrentPage(selectedPage)
      }

      //se o numero de pagina for 1, mostrar a apenas a pagina com os items filtrados
        if (totalPages === 1) {
            moveToPreviousPage();
        }

          const lastIndexPage = currentPage * itemsPerPage;
          const firstIndexPage = lastIndexPage - itemsPerPage;
      
          const paginatedItems = items.slice(firstIndexPage, lastIndexPage);

          return {
            currentPage, 
            totalPages,
            paginatedItems,
            moveToNextPage,
            moveToPreviousPage,
            moveToFirstPage,
            moveToLastPage,
            moveToPageOnClick
          }
    
}

