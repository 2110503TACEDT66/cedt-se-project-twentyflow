export default function RankItem({ rank, name, price, hour } : { rank: number, name: string, price?: string, hour?: string}) {
    return (
      <div className="flex items-center justify-between px-4 py-3 bg-white rounded-3xl w-[90%] m-3">
          <div className="flex items-center space-x-10">
          <div className="ml-5">{rank}</div>
          <div>{name}</div>
          </div>
          <div>{price || hour}</div>
      </div>
    )
  }