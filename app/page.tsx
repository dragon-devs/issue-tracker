import {Button, Flex} from "@radix-ui/themes";
import Pagination from "@/app/components/Pagination";


export default function Home() {

  return (
      <Flex>
        <Pagination itemCount={100} pageSize={10} currentPage={10} />
      </Flex>
  )
}
