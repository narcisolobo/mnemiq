interface LevelBadgeProps {
  level: number;
}

function LevelBadge({ level }: LevelBadgeProps) {
  return (
    <div className="font-display bg-info text-info-content border-neutral w-fit border-4 px-2 py-1 text-sm font-semibold uppercase md:px-4 md:py-2 md:text-lg">
      Level {level}
    </div>
  );
}

interface StreakProps {
  streak: number;
}

function Streak({ streak }: StreakProps) {
  return (
    <div className="text-base-content">
      <p className="text-sm font-semibold md:text-lg">🔥 {streak}-day streak</p>
    </div>
  );
}

function LevelUp() {
  return (
    <div className="card card-lg bg-base-100 border-neutral mx-auto max-w-3xl border-4 shadow-lg">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <LevelBadge level={12} />
          <Streak streak={14} />
        </div>
        <div className="border-neutral bg-base-content mt-2 h-10 w-full border-4 md:h-12">
          <div className="bg-primary border-neutral h-full w-3/4 border-r-4"></div>
        </div>
        <p className="text-base-content text-xs md:text-base">
          2,250 / 3000 xp to level 13
        </p>
      </div>
    </div>
  );
}

export default LevelUp;
