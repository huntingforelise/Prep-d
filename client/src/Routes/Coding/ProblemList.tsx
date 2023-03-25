import { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../../Context";
import { Link } from "react-router-dom";
import { getProblems, getSolvedProblems } from "../../Util/ApiService";

const ProblemList = ({ dashboard }: { dashboard: boolean }) => {
  const { currentUser } = useContext(Context);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [solvedIds, setSolvedIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const receivedProblems = await getProblems();
      setProblems(receivedProblems);
      const solvedProblems = await getSolvedProblems(currentUser.id);
      setSolvedIds(
        solvedProblems.map(
          (solvedProblem: SolvedProblem) => solvedProblem.problem_id
        )
      );
    };
    if (currentUser) fetchData();
  }, [currentUser]);

  const level: Dict = {
    1: "Beginner",
    2: "Intermediate",
    3: "Advanced",
    4: "Expert",
  };

  const lang: Dict = {
    javascript: "JS",
  };

  return dashboard ? (
    <div
      className={
        "text-right border border-teal-600 rounded-2xl text-lg p-10 h-max min-h-max flex flex-col bg-eerie-black text-white"
      }
    >
      <Link
        to={"/codingtest/level/" + "beginner"}
        className="hover:opacity-50 active:opacity-75"
      >
        Work on <span className="font-bold">beginner</span> challenges
      </Link>
      <Link
        to={"/codingtest/level/" + "intermediate"}
        className="hover:opacity-50 active:opacity-75"
      >
        Work on <span className="font-bold">intermediate</span> challenges
      </Link>
      <Link
        to={"/codingtest/level/" + "advanced"}
        className="hover:opacity-50 active:opacity-75"
      >
        Work on <span className="font-bold">advanced</span> challenges
      </Link>
      <Link
        to={"/codingtest/level/" + "expert"}
        className="hover:opacity-50 active:opacity-75"
      >
        Work on <span className="font-bold">expert</span> challenges
      </Link>
      <Link
        to={"/codingtest/level/" + "all"}
        className="hover:opacity-50 active:opacity-75"
      >
        Work on <span className="font-bold">all</span> challenges
      </Link>
    </div>
  ) : (
    <>
      <div
        className={
          "text-center border border-teal-600 rounded-2xl text-lg p-10 h-max min-h-max flex flex-col bg-eerie-black text-white"
        }
      >
        <Link
          to={"/codingtest/level/" + "beginner"}
          className="hover:opacity-50 active:opacity-75"
        >
          Work on <span className="font-bold">beginner</span> challenges
        </Link>
        <Link
          to={"/codingtest/level/" + "intermediate"}
          className="hover:opacity-50 active:opacity-75"
        >
          Work on <span className="font-bold">intermediate</span> challenges
        </Link>
        <Link
          to={"/codingtest/level/" + "advanced"}
          className="hover:opacity-50 active:opacity-75"
        >
          Work on <span className="font-bold">advanced</span> challenges
        </Link>
        <Link
          to={"/codingtest/level/" + "expert"}
          className="hover:opacity-50 active:opacity-75"
        >
          Work on <span className="font-bold">expert</span> challenges
        </Link>
        <Link
          to={"/codingtest/level/" + "all"}
          className="hover:opacity-50 active:opacity-75"
        >
          Work on <span className="font-bold">all</span> challenges
        </Link>
      </div>
      <div
        className={
          "text-center border border-teal-600 rounded-2xl text-lg p-10 h-max min-h-max flex flex-col bg-eerie-black text-white"
        }
      >
        {problems.map((problem) => (
          <Link
            to={"/codingtest/" + problem._id}
            key={problem._id}
            className="hover:opacity-50 active:opacity-75"
          >
            {problem.name}{" "}
            <span className="border border-teal-600 rounded-sm text-xs pl-0.5 pr-0.5">
              {level[problem.level]}
            </span>
            <span className="border border-teal-600 rounded-sm text-xs pl-0.5 pr-0.5">
              {lang[problem.language]}
            </span>
            {solvedIds.includes(problem._id) && (
              <span className="border border-teal-600 rounded-sm text-xs pl-0.5 pr-0.5">
                Solved
              </span>
            )}
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProblemList;
