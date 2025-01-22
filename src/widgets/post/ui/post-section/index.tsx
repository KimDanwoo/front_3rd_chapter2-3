import { usePosts, useUrlSync } from '@features/post/model'
import { Pagination, PostTableBody } from '@features/post/ui'
import { SearchInput, TagSelect, SortBySelect, SortOrderSelect } from '@features/search/ui'
import { Card, Table } from '@shared/ui'

export const PostSection = () => {
  useUrlSync()

  const { isLoading } = usePosts()

  return (
    <Card.Content>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <SearchInput />

          <TagSelect />

          <SortBySelect />

          <SortOrderSelect />
        </div>

        {isLoading ? (
          <div className="flex justify-center p-4">로딩 중...</div>
        ) : (
          <Table.Container>
            <Table.Header>
              <Table.Row>
                <Table.Head className="w-[50px]">ID</Table.Head>
                <Table.Head>제목</Table.Head>
                <Table.Head className="w-[150px]">작성자</Table.Head>
                <Table.Head className="w-[150px]">반응</Table.Head>
                <Table.Head className="w-[150px]">작업</Table.Head>
              </Table.Row>
            </Table.Header>

            <PostTableBody />
          </Table.Container>
        )}

        <Pagination />
      </div>
    </Card.Content>
  )
}
