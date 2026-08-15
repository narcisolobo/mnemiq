interface LevelBadgeProps {
  level: number;
}

function LevelBadge({ level }: LevelBadgeProps) {
  return (
    <div className="font-display bg-info text-info-content border-neutral w-fit border-4 px-4 py-2 text-lg font-semibold uppercase">
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
      <p className="text-lg font-semibold">🔥 {streak}-day streak</p>
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
        <div className="border-neutral bg-base-content mt-2 h-12 w-full border-4">
          <div className="bg-primary border-neutral h-full w-3/4 border-r-4"></div>
        </div>
        <p className="text-base-content">2,250 / 3000 xp to level 13</p>
      </div>
    </div>
  );
}

export default LevelUp;
